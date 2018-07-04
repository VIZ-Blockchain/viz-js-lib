import EventEmitter from 'events';
import Promise from 'bluebird';
import cloneDeep from 'lodash/cloneDeep';
import defaults from 'lodash/defaults';
import isNode from 'detect-node';
import newDebug from 'debug';
import config from '../config';
import methods from './methods';
import { camelCase } from '../utils';

const debugEmitters = newDebug('viz:emitters');
const debugProtocol = newDebug('viz:protocol');
const debugSetup = newDebug('viz:setup');
const debugWs = newDebug('viz:ws');

let WebSocket;
if (isNode) {
  WebSocket = require('ws'); // eslint-disable-line global-require
} else if (typeof window !== 'undefined') {
  WebSocket = window.WebSocket;
} else {
  throw new Error('Couldn\'t decide on a `WebSocket` class');
}

const DEFAULTS = {
  id: 0,
};

const expectedResponseMs = process.env.EXPECTED_RESPONSE_MS || 2000;

class VIZ extends EventEmitter {
  constructor(options = {}) {
    super(options);
    defaults(options, DEFAULTS);
    this.options = cloneDeep(options);
    this.id = 0;
    this.inFlight = 0;
    this.currentP = Promise.fulfilled();
    this.isOpen = false;
    this.releases = [];
    this.requests = {};
  }

  setWebSocket(url) {
    console.warn("viz.api.setWebSocket(url) is now deprecated instead use viz.config.set('websocket',url)");
    debugSetup('Setting WS', url);
    config.set('websocket', url);
    this.stop();
  }

  start() {
    if (this.startP) {
      return this.startP;
    }

    const startP = new Promise((resolve, reject) => {
      if (startP !== this.startP) return;
      const url = config.get('websocket');
      this.ws = new WebSocket(url);

      const releaseOpen = this.listenTo(this.ws, 'open', () => {
        debugWs('Opened WS connection with', url);
        this.isOpen = true;
        releaseOpen();
        resolve();
      });

      const releaseClose = this.listenTo(this.ws, 'close', () => {
        debugWs('Closed WS connection with', url);
        this.isOpen = false;
        delete this.ws;
        this.stop();

        if (startP.isPending()) {
          reject(new Error('The WS connection was closed before this operation was made'));
        }
      });

      const releaseMessage = this.listenTo(this.ws, 'message', (message) => {
        debugWs('Received message', message.data);
        const data = JSON.parse(message.data);
        const id = data.id;
        const request = this.requests[id];
        if (!request) {
          debugWs('VIZ.onMessage error: unknown request ', id);
          return;
        }
        delete this.requests[id];
        this.onMessage(data, request);
      });

      this.releases = this.releases.concat([
        releaseOpen,
        releaseClose,
        releaseMessage,
      ]);
    });

    this.startP = startP;

    return startP;
  }

  stop() {
    debugSetup('Stopping...');
    if (this.ws) this.ws.close();
    delete this.startP;
    delete this.ws;
    this.releases.forEach((release) => release());
    this.releases = [];
  }

  listenTo(target, eventName, callback) {
    debugEmitters('Adding listener for', eventName, 'from', target.constructor.name);
    if (target.addEventListener) target.addEventListener(eventName, callback);
    else target.on(eventName, callback);

    return () => {
      debugEmitters('Removing listener for', eventName, 'from', target.constructor.name);
      if (target.removeEventListener) target.removeEventListener(eventName, callback);
      else target.removeListener(eventName, callback);
    };
  }

  onMessage(message, request) {
    const {api, data, resolve, reject, start_time} = request;
    debugWs('-- VIZ.onMessage -->', message.id);
    const errorCause = message.error;
    if (errorCause) {
      const err = new Error(
        // eslint-disable-next-line prefer-template
        (errorCause.message || 'Failed to complete operation') +
        ' (see err.payload for the full error payload)'
      );
      err.payload = message;
      reject(err);
      return;
    }

    debugProtocol('Resolved', api, data, '->', message);
    this.emit('track-performance', data.method, Date.now() - start_time);
    delete this.requests[message.id];
    resolve(message.result);
  }

  send(api, data, callback) {
    debugSetup('VIZ::send', api, data);
    const id = data.id || this.id++;
    const startP = this.start();

    this.currentP = startP
    .then(() => new Promise((resolve, reject) => {
        if (!this.ws) {
          reject(new Error('The WS connection was closed while this request was pending'));
          return;
        }

        const payload = JSON.stringify({
          id,
          method: 'call',
          jsonrpc: '2.0',
          params: [
            api,
            data.method,
            data.params,
          ],
        });

        debugWs('Sending message', payload);
        this.requests[id] = {
          api,
          data,
          resolve,
          reject,
          start_time: Date.now()
        };

        this.ws.send(payload);
      }))
      .nodeify(callback);

    return this.currentP;
  }

  streamBlockNumber(mode = 'head', callback, ts = 200) {
    if (typeof mode === 'function') {
      callback = mode;
      mode = 'head';
    }
    let current = '';
    let running = true;

    const update = () => {
      if (!running) return;

      this.getDynamicGlobalPropertiesAsync()
        .then((result) => {
          const blockId = mode === 'irreversible'
            ? result.last_irreversible_block_num
            : result.head_block_number;

          if (blockId !== current) {
            if (current) {
              for (let i = current; i < blockId; i++) {
                if (i !== current) {
                  callback(null, i);
                }
                current = i;
              }
            } else {
              current = blockId;
              callback(null, blockId);
            }
          }

          Promise.delay(ts).then(() => {
            update();
          });
        }, (err) => {
          callback(err);
        });
    };

    update();

    return () => {
      running = false;
    };
  }

  streamBlock(mode = 'head', callback) {
    if (typeof mode === 'function') {
      callback = mode;
      mode = 'head';
    }

    let current = '';
    let last = '';

    const release = this.streamBlockNumber(mode, (err, id) => {
      if (err) {
        release();
        callback(err);
        return;
      }

      current = id;
      if (current !== last) {
        last = current;
        this.getBlock(current, callback);
      }
    });

    return release;
  }

  streamTransactions(mode = 'head', callback) {
    if (typeof mode === 'function') {
      callback = mode;
      mode = 'head';
    }

    const release = this.streamBlock(mode, (err, result) => {
      if (err) {
        release();
        callback(err);
        return;
      }

      if (result && result.transactions) {
        result.transactions.forEach((transaction) => {
          callback(null, transaction);
        });
      }
    });

    return release;
  }

  streamOperations(mode = 'head', callback) {
    if (typeof mode === 'function') {
      callback = mode;
      mode = 'head';
    }

    const release = this.streamTransactions(mode, (err, transaction) => {
      if (err) {
        release();
        callback(err);
        return;
      }

      transaction.operations.forEach((operation) => {
        callback(null, operation);
      });
    });

    return release;
  }
}

// Generate Methods from methods.js
methods.forEach((method) => {
  const methodName = method.method_name || camelCase(method.method);
  const methodParams = method.params || [];

  VIZ.prototype[`${methodName}With`] =
    function VIZ$$specializedSendWith(options, callback) {
      const params = methodParams.map((param) => options[param]);
      return this.send(method.api, {
        method: method.method,
        params,
      }, callback);
    };

  VIZ.prototype[methodName] =
    function VIZ$specializedSend(...args) {
      const options = methodParams.reduce((memo, param, i) => {
        memo[param] = args[i]; // eslint-disable-line no-param-reassign
        return memo;
      }, {});
      const callback = args[methodParams.length];

      return this[`${methodName}With`](options, callback);
    };
});

Promise.promisifyAll(VIZ.prototype);

// Export singleton instance
const viz = new VIZ();
exports = module.exports = viz;
exports.VIZ = VIZ;
exports.VIZ.DEFAULTS = DEFAULTS;

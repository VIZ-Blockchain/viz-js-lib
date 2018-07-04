import Promise from 'bluebird';
import should from 'should';
import viz from '../src';

const username = process.env.VIZ_USERNAME || 'guest123';
const password = process.env.VIZ_PASSWORD;
const postingWif = password
  ? viz.auth.toWif(username, password, 'posting')
  : '5JRaypasxMx1L97ZUX7YuC5Psb5EAbF821kkAGtBj7xCJFQcbLg';

describe('viz.broadcast:', () => {
  it('exists', () => {
    should.exist(viz.broadcast);
  });

  it('has generated methods', () => {
    should.exist(viz.broadcast.vote);
    should.exist(viz.broadcast.voteWith);
    should.exist(viz.broadcast.comment);
    should.exist(viz.broadcast.transfer);
  });

  it('has backing methods', () => {
    should.exist(viz.broadcast.send);
  });

  it('has promise methods', () => {
    should.exist(viz.broadcast.sendAsync);
    should.exist(viz.broadcast.voteAsync);
    should.exist(viz.broadcast.transferAsync);
  });

  describe('patching transaction with default global properties', () => {
    it('works', async () => {
      const tx = await viz.broadcast._prepareTransaction({
        extensions: [],
        operations: [['vote', {
          voter: 'pal',
          author: 'pal',
          permlink: '2scmtp-test',
        }]],
      });

      tx.should.have.properties([
        'expiration',
        'ref_block_num',
        'ref_block_prefix',
        'extensions',
        'operations',
      ]);
    });
  });

  describe('downvoting', () => {
    it('works', async () => {
      const tx = await viz.broadcast.voteAsync(
        postingWif,
        username,
        'pal',
        '2scmtp-test',
        -1000
      );

      tx.should.have.properties([
        'expiration',
        'ref_block_num',
        'ref_block_prefix',
        'extensions',
        'operations',
        'signatures',
      ]);
    });
  });

  describe('voting', () => {
    beforeEach(() => {
      return Promise.delay(2000);
    });

    it('works', async () => {
      const tx = await viz.broadcast.voteAsync(
        postingWif,
        username,
        'pal',
        '2scmtp-test',
        10000
      );

      tx.should.have.properties([
        'expiration',
        'ref_block_num',
        'ref_block_prefix',
        'extensions',
        'operations',
        'signatures',
      ]);
    });

    it('works with callbacks', (done) => {
      viz.broadcast.vote(
        postingWif,
        username,
        'pal',
        '2scmtp-test',
        5000,
        (err, tx) => {
          if (err) return done(err);
          tx.should.have.properties([
            'expiration',
            'ref_block_num',
            'ref_block_prefix',
            'extensions',
            'operations',
            'signatures',
          ]);
          done();
        }
      );
    });
  });

  describe('customJson', () => {
    before(() => {
      return Promise.delay(2000);
    });

    it('works', async () => {
      const tx = await viz.broadcast.customJsonAsync(
        postingWif,
        [],
        [username],
        'follow',
        JSON.stringify([
          'follow',
          {
            follower: username,
            following: 'fabien',
            what: ['blog'],
          },
        ])
      );

      tx.should.have.properties([
        'expiration',
        'ref_block_num',
        'ref_block_prefix',
        'extensions',
        'operations',
        'signatures',
      ]);
    });
  });
});

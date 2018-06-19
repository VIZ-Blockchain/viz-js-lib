import Promise from 'bluebird';
import should from 'should';
import golos from '../src';
import pkg from '../package.json';

const username = process.env.GOLOS_USERNAME || 'guest123';
const password = process.env.GOLOS_PASSWORD;
const postingWif = password
  ? golos.auth.toWif(username, password, 'posting')
  : '5JRaypasxMx1L97ZUX7YuC5Psb5EAbF821kkAGtBj7xCJFQcbLg';

describe('golos.broadcast:', () => {

  describe('comment with beneficiaries', () => {
    before(() => {
      return Promise.delay(2000);
    });

    it('works', async () => {
      const permlink = golos.formatter.commentPermlink('pal', '2scmtp-test');
      const operations = [
        ['comment',
          {
            parent_author: 'pal',
            parent_permlink: '2scmtp-test',
            author: username,
            permlink,
            title: 'Test',
            body: `This is a test using Golos.js v${pkg.version}.`,
            json_metadata : JSON.stringify({
              tags: ['test'],
              app: `golosjs/${pkg.version}`
            }),
            extensions: [
              [0, {
                beneficiaries: [
                  { account: 'pal', weight: 2000 },
                  { account: 'null', weight: 5000 }
                ]
              }]
            ]
          }
        ]
      ];

      const tx = await golos.broadcast.sendAsync(
        { operations, extensions: [] },
        { posting: postingWif }
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

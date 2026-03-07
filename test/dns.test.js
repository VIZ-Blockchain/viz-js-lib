/**
 * VIZ DNS Helpers Test Suite
 */

const assert = require('assert');
const dns = require('../src/dns');

describe('VIZ DNS Helpers', function() {
  describe('Validation Functions', function() {
    describe('isValidIPv4', function() {
      it('should return true for valid IPv4 addresses', function() {
        assert.strictEqual(dns.isValidIPv4('188.120.231.153'), true);
        assert.strictEqual(dns.isValidIPv4('192.168.1.1'), true);
        assert.strictEqual(dns.isValidIPv4('0.0.0.0'), true);
        assert.strictEqual(dns.isValidIPv4('255.255.255.255'), true);
        assert.strictEqual(dns.isValidIPv4('10.0.0.50'), true);
      });

      it('should return false for invalid IPv4 addresses', function() {
        assert.strictEqual(dns.isValidIPv4('256.120.231.153'), false);
        assert.strictEqual(dns.isValidIPv4('188.120.231'), false);
        assert.strictEqual(dns.isValidIPv4('188.120.231.153.1'), false);
        assert.strictEqual(dns.isValidIPv4('abc.def.ghi.jkl'), false);
        assert.strictEqual(dns.isValidIPv4(''), false);
        assert.strictEqual(dns.isValidIPv4(null), false);
        assert.strictEqual(dns.isValidIPv4(undefined), false);
        assert.strictEqual(dns.isValidIPv4(12345), false);
      });
    });

    describe('isValidSHA256Hash', function() {
      it('should return true for valid SHA256 hashes', function() {
        assert.strictEqual(dns.isValidSHA256Hash('4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2'), true);
        assert.strictEqual(dns.isValidSHA256Hash('ABCDEF1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF1234567890'), true);
      });

      it('should return false for invalid SHA256 hashes', function() {
        assert.strictEqual(dns.isValidSHA256Hash('4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e'), false); // 63 chars
        assert.strictEqual(dns.isValidSHA256Hash('4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2a'), false); // 65 chars
        assert.strictEqual(dns.isValidSHA256Hash('ghijklmnopqrstuvwxyz1234567890ghijklmnopqrstuvwxyz1234567890ghij'), false); // invalid chars
        assert.strictEqual(dns.isValidSHA256Hash(''), false);
        assert.strictEqual(dns.isValidSHA256Hash(null), false);
      });
    });

    describe('isValidTTL', function() {
      it('should return true for valid TTL values', function() {
        assert.strictEqual(dns.isValidTTL(28800), true);
        assert.strictEqual(dns.isValidTTL(1), true);
        assert.strictEqual(dns.isValidTTL(86400), true);
      });

      it('should return false for invalid TTL values', function() {
        assert.strictEqual(dns.isValidTTL(0), false);
        assert.strictEqual(dns.isValidTTL(-1), false);
        assert.strictEqual(dns.isValidTTL(1.5), false);
        assert.strictEqual(dns.isValidTTL('28800'), false);
        assert.strictEqual(dns.isValidTTL(null), false);
      });
    });

    describe('isValidSslTxtRecord', function() {
      it('should return true for valid SSL TXT records', function() {
        assert.strictEqual(dns.isValidSslTxtRecord('ssl=4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2'), true);
      });

      it('should return false for invalid SSL TXT records', function() {
        assert.strictEqual(dns.isValidSslTxtRecord('ssl=invalidhash'), false);
        assert.strictEqual(dns.isValidSslTxtRecord('4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2'), false);
        assert.strictEqual(dns.isValidSslTxtRecord(''), false);
      });
    });
  });

  describe('Record Creation Functions', function() {
    describe('createARecord', function() {
      it('should create a valid A record tuple', function() {
        const record = dns.createARecord('188.120.231.153');
        assert.deepStrictEqual(record, ['A', '188.120.231.153']);
      });

      it('should throw error for invalid IPv4', function() {
        assert.throws(() => dns.createARecord('invalid'), /Invalid IPv4/);
      });
    });

    describe('createSslTxtRecord', function() {
      it('should create a valid SSL TXT record tuple', function() {
        const record = dns.createSslTxtRecord('4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2');
        assert.deepStrictEqual(record, ['TXT', 'ssl=4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2']);
      });

      it('should lowercase the hash', function() {
        const record = dns.createSslTxtRecord('4A4613DAEF37CBC5C4A5156CD7B24EA2E6EE2E5F1E7461262A2DF2B63CBF17E2');
        assert.deepStrictEqual(record, ['TXT', 'ssl=4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2']);
      });

      it('should throw error for invalid hash', function() {
        assert.throws(() => dns.createSslTxtRecord('invalidhash'), /Invalid SHA256/);
      });
    });

    describe('createNsMetadata', function() {
      it('should create NS metadata with A records', function() {
        const metadata = dns.createNsMetadata({
          aRecords: ['188.120.231.153', '192.168.1.100']
        });
        assert.deepStrictEqual(metadata, {
          ns: [['A', '188.120.231.153'], ['A', '192.168.1.100']],
          ttl: 28800
        });
      });

      it('should create NS metadata with SSL hash', function() {
        const metadata = dns.createNsMetadata({
          aRecords: ['188.120.231.153'],
          sslHash: '4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2'
        });
        assert.deepStrictEqual(metadata, {
          ns: [
            ['A', '188.120.231.153'],
            ['TXT', 'ssl=4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2']
          ],
          ttl: 28800
        });
      });

      it('should use custom TTL', function() {
        const metadata = dns.createNsMetadata({
          aRecords: ['188.120.231.153'],
          ttl: 3600
        });
        assert.strictEqual(metadata.ttl, 3600);
      });

      it('should throw error for invalid TTL', function() {
        assert.throws(() => dns.createNsMetadata({ ttl: -1 }), /Invalid TTL/);
      });
    });
  });

  describe('Parsing Functions', function() {
    const sampleMetadata = {
      ns: [
        ['A', '188.120.231.153'],
        ['A', '192.168.1.100'],
        ['TXT', 'ssl=4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2']
      ],
      ttl: 28800
    };

    const sampleMetadataStr = JSON.stringify(sampleMetadata);

    describe('parseNsMetadata', function() {
      it('should parse NS metadata from object', function() {
        const result = dns.parseNsMetadata(sampleMetadata);
        assert.deepStrictEqual(result.ns, sampleMetadata.ns);
        assert.strictEqual(result.ttl, 28800);
      });

      it('should parse NS metadata from string', function() {
        const result = dns.parseNsMetadata(sampleMetadataStr);
        assert.deepStrictEqual(result.ns, sampleMetadata.ns);
        assert.strictEqual(result.ttl, 28800);
      });

      it('should return null for invalid input', function() {
        assert.strictEqual(dns.parseNsMetadata('invalid json'), null);
        assert.strictEqual(dns.parseNsMetadata({}), null);
        assert.strictEqual(dns.parseNsMetadata(null), null);
      });
    });

    describe('extractARecords', function() {
      it('should extract A records from metadata', function() {
        const result = dns.extractARecords(sampleMetadata);
        assert.deepStrictEqual(result, ['188.120.231.153', '192.168.1.100']);
      });

      it('should return empty array for missing NS data', function() {
        assert.deepStrictEqual(dns.extractARecords({}), []);
      });
    });

    describe('extractSslHash', function() {
      it('should extract SSL hash from metadata', function() {
        const result = dns.extractSslHash(sampleMetadata);
        assert.strictEqual(result, '4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2');
      });

      it('should return null for missing SSL hash', function() {
        const metadata = { ns: [['A', '188.120.231.153']], ttl: 28800 };
        assert.strictEqual(dns.extractSslHash(metadata), null);
      });
    });

    describe('extractTxtRecords', function() {
      it('should extract all TXT records', function() {
        const result = dns.extractTxtRecords(sampleMetadata);
        assert.deepStrictEqual(result, ['ssl=4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2']);
      });
    });

    describe('getNsSummary', function() {
      it('should return a complete summary', function() {
        const summary = dns.getNsSummary(sampleMetadata);
        assert.deepStrictEqual(summary, {
          aRecords: ['188.120.231.153', '192.168.1.100'],
          sslHash: '4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2',
          txtRecords: ['ssl=4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2'],
          ttl: 28800
        });
      });
    });

    describe('hasNsRecords', function() {
      it('should return true when NS records exist', function() {
        assert.strictEqual(dns.hasNsRecords(sampleMetadata), true);
      });

      it('should return false when NS records are missing', function() {
        assert.strictEqual(dns.hasNsRecords({}), false);
        assert.strictEqual(dns.hasNsRecords({ ns: [] }), false);
      });
    });
  });

  describe('Metadata Manipulation Functions', function() {
    describe('mergeNsMetadata', function() {
      it('should merge NS data into existing metadata', function() {
        const existing = { profile: { name: 'Test' } };
        const nsData = { ns: [['A', '188.120.231.153']], ttl: 28800 };
        const result = dns.mergeNsMetadata(existing, nsData);
        assert.deepStrictEqual(result, {
          profile: { name: 'Test' },
          ns: [['A', '188.120.231.153']],
          ttl: 28800
        });
      });

      it('should parse string metadata', function() {
        const existing = '{"profile": {"name": "Test"}}';
        const nsData = { ns: [['A', '188.120.231.153']], ttl: 28800 };
        const result = dns.mergeNsMetadata(existing, nsData);
        assert.strictEqual(result.profile.name, 'Test');
        assert.deepStrictEqual(result.ns, [['A', '188.120.231.153']]);
      });
    });

    describe('removeNsMetadata', function() {
      it('should remove NS data from metadata', function() {
        const existing = {
          profile: { name: 'Test' },
          ns: [['A', '188.120.231.153']],
          ttl: 28800
        };
        const result = dns.removeNsMetadata(existing);
        assert.deepStrictEqual(result, { profile: { name: 'Test' } });
        assert.strictEqual(result.ns, undefined);
        assert.strictEqual(result.ttl, undefined);
      });
    });

    describe('addARecord', function() {
      it('should add A record to existing metadata', function() {
        const existing = { ns: [['A', '188.120.231.153']], ttl: 28800 };
        const result = dns.addARecord(existing, '192.168.1.100');
        assert.deepStrictEqual(result.ns, [
          ['A', '188.120.231.153'],
          ['A', '192.168.1.100']
        ]);
      });

      it('should create NS array if not exists', function() {
        const result = dns.addARecord({}, '188.120.231.153');
        assert.deepStrictEqual(result.ns, [['A', '188.120.231.153']]);
        assert.strictEqual(result.ttl, 28800);
      });
    });

    describe('removeARecord', function() {
      it('should remove A record from metadata', function() {
        const existing = {
          ns: [['A', '188.120.231.153'], ['A', '192.168.1.100']],
          ttl: 28800
        };
        const result = dns.removeARecord(existing, '188.120.231.153');
        assert.deepStrictEqual(result.ns, [['A', '192.168.1.100']]);
      });
    });

    describe('setSslHash', function() {
      it('should set SSL hash in metadata', function() {
        const existing = { ns: [['A', '188.120.231.153']], ttl: 28800 };
        const result = dns.setSslHash(existing, '4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2');
        assert.deepStrictEqual(result.ns, [
          ['A', '188.120.231.153'],
          ['TXT', 'ssl=4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2']
        ]);
      });

      it('should replace existing SSL hash', function() {
        const existing = {
          ns: [
            ['A', '188.120.231.153'],
            ['TXT', 'ssl=0000000000000000000000000000000000000000000000000000000000000000']
          ],
          ttl: 28800
        };
        const result = dns.setSslHash(existing, '4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2');
        const sslRecords = result.ns.filter(r => r[0] === 'TXT' && r[1].startsWith('ssl='));
        assert.strictEqual(sslRecords.length, 1);
        assert.strictEqual(sslRecords[0][1], 'ssl=4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2');
      });
    });

    describe('removeSslHash', function() {
      it('should remove SSL hash from metadata', function() {
        const existing = {
          ns: [
            ['A', '188.120.231.153'],
            ['TXT', 'ssl=4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2']
          ],
          ttl: 28800
        };
        const result = dns.removeSslHash(existing);
        assert.deepStrictEqual(result.ns, [['A', '188.120.231.153']]);
      });
    });

    describe('setTtl', function() {
      it('should set TTL in metadata', function() {
        const existing = { ns: [['A', '188.120.231.153']], ttl: 28800 };
        const result = dns.setTtl(existing, 3600);
        assert.strictEqual(result.ttl, 3600);
      });

      it('should throw error for invalid TTL', function() {
        assert.throws(() => dns.setTtl({}, -1), /Invalid TTL/);
      });
    });
  });

  describe('Validation', function() {
    describe('validateNsMetadata', function() {
      it('should validate correct NS metadata', function() {
        const nsData = {
          ns: [
            ['A', '188.120.231.153'],
            ['TXT', 'ssl=4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2']
          ],
          ttl: 28800
        };
        const result = dns.validateNsMetadata(nsData);
        assert.strictEqual(result.isValid, true);
        assert.deepStrictEqual(result.errors, []);
      });

      it('should detect invalid IPv4 in A record', function() {
        const nsData = { ns: [['A', 'invalid']], ttl: 28800 };
        const result = dns.validateNsMetadata(nsData);
        assert.strictEqual(result.isValid, false);
        assert.ok(result.errors.some(e => e.includes('invalid IPv4')));
      });

      it('should detect invalid TTL', function() {
        const nsData = { ns: [['A', '188.120.231.153']], ttl: -1 };
        const result = dns.validateNsMetadata(nsData);
        assert.strictEqual(result.isValid, false);
        assert.ok(result.errors.some(e => e.includes('Invalid TTL')));
      });

      it('should detect unsupported record type', function() {
        const nsData = { ns: [['AAAA', '::1']], ttl: 28800 };
        const result = dns.validateNsMetadata(nsData);
        assert.strictEqual(result.isValid, false);
        assert.ok(result.errors.some(e => e.includes('unsupported record type')));
      });
    });
  });

  describe('Constants', function() {
    it('should export DEFAULT_TTL', function() {
      assert.strictEqual(dns.DEFAULT_TTL, 28800);
    });

    it('should export MAX_TXT_LENGTH', function() {
      assert.strictEqual(dns.MAX_TXT_LENGTH, 256);
    });

    it('should export SHA256_HEX_LENGTH', function() {
      assert.strictEqual(dns.SHA256_HEX_LENGTH, 64);
    });
  });
});

/**
 * VIZ DNS Nameserver Helpers
 *
 * A module for working with NS records (A and TXT) stored in VIZ blockchain account metadata.
 * Based on viz-dns-nameserver-spec.md
 *
 * @module viz/dns
 */

/** Default TTL value in seconds (8 hours) */
const DEFAULT_TTL = 28800;

/** Maximum TXT record length per NS standard */
const MAX_TXT_LENGTH = 256;

/** SHA256 hash length in hex (64 characters) */
const SHA256_HEX_LENGTH = 64;

/** IPv4 address validation regex */
const IPV4_REGEX = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

/** SHA256 hex hash validation regex */
const SHA256_HEX_REGEX = /^[a-f0-9]{64}$/i;

/**
 * Validates an IPv4 address
 * @param {string} ipv4 - IPv4 address to validate
 * @returns {boolean} True if valid IPv4 address
 */
function isValidIPv4(ipv4) {
  if (typeof ipv4 !== 'string') return false;
  return IPV4_REGEX.test(ipv4);
}

/**
 * Validates a SHA256 hash string (64 hex characters)
 * @param {string} hash - Hash string to validate
 * @returns {boolean} True if valid SHA256 hex hash
 */
function isValidSHA256Hash(hash) {
  if (typeof hash !== 'string') return false;
  return SHA256_HEX_REGEX.test(hash);
}

/**
 * Validates a TTL value
 * @param {number} ttl - TTL value in seconds
 * @returns {boolean} True if valid TTL (positive integer)
 */
function isValidTTL(ttl) {
  return Number.isInteger(ttl) && ttl > 0;
}

/**
 * Validates a TXT record value
 * @param {string} txt - TXT record value
 * @returns {boolean} True if valid TXT record (not exceeding max length)
 */
function isValidTxtRecord(txt) {
  if (typeof txt !== 'string') return false;
  return txt.length > 0 && txt.length <= MAX_TXT_LENGTH;
}

/**
 * Validates an SSL TXT record (ssl=<hash> format)
 * @param {string} txt - TXT record value
 * @returns {boolean} True if valid SSL TXT record
 */
function isValidSslTxtRecord(txt) {
  if (!isValidTxtRecord(txt)) return false;
  if (!txt.startsWith('ssl=')) return false;
  const hash = txt.substring(4);
  return isValidSHA256Hash(hash);
}

/**
 * Creates an A record tuple
 * @param {string} ipv4 - IPv4 address
 * @returns {Array} A record tuple ["A", ipv4]
 * @throws {Error} If IPv4 address is invalid
 */
function createARecord(ipv4) {
  if (!isValidIPv4(ipv4)) {
    throw new Error(`Invalid IPv4 address: ${ipv4}`);
  }
  return ['A', ipv4];
}

/**
 * Creates a TXT record tuple for SSL certificate hash
 * @param {string} hash - SHA256 hash of SSL certificate public key
 * @returns {Array} TXT record tuple ["TXT", "ssl=<hash>"]
 * @throws {Error} If hash is invalid
 */
function createSslTxtRecord(hash) {
  if (!isValidSHA256Hash(hash)) {
    throw new Error(`Invalid SHA256 hash: ${hash}`);
  }
  return ['TXT', `ssl=${hash.toLowerCase()}`];
}

/**
 * Creates a generic TXT record tuple
 * @param {string} value - TXT record value
 * @returns {Array} TXT record tuple ["TXT", value]
 * @throws {Error} If TXT value is invalid
 */
function createTxtRecord(value) {
  if (!isValidTxtRecord(value)) {
    throw new Error(`Invalid TXT record value: ${value}`);
  }
  return ['TXT', value];
}

/**
 * Creates a new NS metadata object
 * @param {Object} [options] - Options for creating NS metadata
 * @param {Array<string>} [options.aRecords] - Array of IPv4 addresses
 * @param {string} [options.sslHash] - SSL certificate public key hash
 * @param {Array<string>} [options.txtRecords] - Array of custom TXT record values
 * @param {number} [options.ttl] - Time-to-live in seconds (default: 28800)
 * @returns {Object} NS metadata object with ns array and ttl
 * @example
 * createNsMetadata({
 *   aRecords: ['188.120.231.153', '192.168.1.100'],
 *   sslHash: '4a4613daef37cbc5c4a5156cd7b24ea2e6ee2e5f1e7461262a2df2b63cbf17e2',
 *   ttl: 28800
 * })
 */
function createNsMetadata(options = {}) {
  const { aRecords = [], sslHash, txtRecords = [], ttl = DEFAULT_TTL } = options;

  if (!isValidTTL(ttl)) {
    throw new Error(`Invalid TTL value: ${ttl}`);
  }

  const ns = [];

  // Add A records
  for (const ip of aRecords) {
    ns.push(createARecord(ip));
  }

  // Add SSL TXT record if provided
  if (sslHash) {
    ns.push(createSslTxtRecord(sslHash));
  }

  // Add custom TXT records
  for (const txt of txtRecords) {
    ns.push(createTxtRecord(txt));
  }

  return { ns, ttl };
}

/**
 * Parses NS metadata from account json_metadata
 * @param {string|Object} jsonMetadata - JSON metadata string or parsed object
 * @returns {Object|null} Parsed NS data or null if not found
 * @returns {Array} result.ns - Array of record tuples
 * @returns {number} result.ttl - TTL value
 */
function parseNsMetadata(jsonMetadata) {
  let metadata = jsonMetadata;

  // Parse if string
  if (typeof jsonMetadata === 'string') {
    try {
      metadata = JSON.parse(jsonMetadata);
    } catch (e) {
      return null;
    }
  }

  if (!metadata || typeof metadata !== 'object') {
    return null;
  }

  if (!metadata.ns || !Array.isArray(metadata.ns)) {
    return null;
  }

  return {
    ns: metadata.ns,
    ttl: metadata.ttl || DEFAULT_TTL
  };
}

/**
 * Extracts all A records (IPv4 addresses) from NS metadata
 * @param {string|Object} jsonMetadata - JSON metadata string or parsed object
 * @returns {Array<string>} Array of IPv4 addresses
 */
function extractARecords(jsonMetadata) {
  const nsData = parseNsMetadata(jsonMetadata);
  if (!nsData) return [];

  return nsData.ns
    .filter(record => Array.isArray(record) && record[0] === 'A')
    .map(record => record[1]);
}

/**
 * Extracts the SSL hash from TXT records in NS metadata
 * @param {string|Object} jsonMetadata - JSON metadata string or parsed object
 * @returns {string|null} SSL hash or null if not found
 */
function extractSslHash(jsonMetadata) {
  const nsData = parseNsMetadata(jsonMetadata);
  if (!nsData) return null;

  for (const record of nsData.ns) {
    if (!Array.isArray(record) || record[0] !== 'TXT') continue;

    const value = record[1];
    if (typeof value === 'string' && value.startsWith('ssl=')) {
      const hash = value.substring(4);
      if (isValidSHA256Hash(hash)) {
        return hash.toLowerCase();
      }
    }
  }

  return null;
}

/**
 * Extracts all TXT records from NS metadata
 * @param {string|Object} jsonMetadata - JSON metadata string or parsed object
 * @returns {Array<string>} Array of TXT record values
 */
function extractTxtRecords(jsonMetadata) {
  const nsData = parseNsMetadata(jsonMetadata);
  if (!nsData) return [];

  return nsData.ns
    .filter(record => Array.isArray(record) && record[0] === 'TXT')
    .map(record => record[1]);
}

/**
 * Extracts the TTL value from NS metadata
 * @param {string|Object} jsonMetadata - JSON metadata string or parsed object
 * @returns {number} TTL value or default (28800)
 */
function extractTtl(jsonMetadata) {
  const nsData = parseNsMetadata(jsonMetadata);
  return nsData ? nsData.ttl : DEFAULT_TTL;
}

/**
 * Merges NS data into existing account metadata
 * @param {string|Object} existingMetadata - Existing JSON metadata string or object
 * @param {Object} nsData - NS data to merge (result from createNsMetadata)
 * @returns {Object} Merged metadata object
 */
function mergeNsMetadata(existingMetadata, nsData) {
  let metadata = {};

  // Parse existing metadata
  if (typeof existingMetadata === 'string') {
    try {
      metadata = JSON.parse(existingMetadata) || {};
    } catch (e) {
      metadata = {};
    }
  } else if (existingMetadata && typeof existingMetadata === 'object') {
    metadata = Object.assign({}, existingMetadata);
  }

  // Merge NS data
  if (nsData && nsData.ns) {
    metadata.ns = nsData.ns;
  }
  if (nsData && nsData.ttl) {
    metadata.ttl = nsData.ttl;
  }

  return metadata;
}

/**
 * Removes NS data from account metadata
 * @param {string|Object} existingMetadata - Existing JSON metadata string or object
 * @returns {Object} Metadata object without NS data
 */
function removeNsMetadata(existingMetadata) {
  let metadata = {};

  // Parse existing metadata
  if (typeof existingMetadata === 'string') {
    try {
      metadata = JSON.parse(existingMetadata) || {};
    } catch (e) {
      metadata = {};
    }
  } else if (existingMetadata && typeof existingMetadata === 'object') {
    metadata = Object.assign({}, existingMetadata);
  }

  // Remove NS fields
  delete metadata.ns;
  delete metadata.ttl;

  return metadata;
}

/**
 * Adds an A record to existing NS metadata
 * @param {string|Object} jsonMetadata - JSON metadata string or parsed object
 * @param {string} ipv4 - IPv4 address to add
 * @returns {Object} Updated metadata object
 */
function addARecord(jsonMetadata, ipv4) {
  let metadata = {};

  if (typeof jsonMetadata === 'string') {
    try {
      metadata = JSON.parse(jsonMetadata) || {};
    } catch (e) {
      metadata = {};
    }
  } else if (jsonMetadata && typeof jsonMetadata === 'object') {
    metadata = Object.assign({}, jsonMetadata);
  }

  if (!metadata.ns) {
    metadata.ns = [];
  }
  if (!metadata.ttl) {
    metadata.ttl = DEFAULT_TTL;
  }

  metadata.ns.push(createARecord(ipv4));

  return metadata;
}

/**
 * Removes an A record from existing NS metadata
 * @param {string|Object} jsonMetadata - JSON metadata string or parsed object
 * @param {string} ipv4 - IPv4 address to remove
 * @returns {Object} Updated metadata object
 */
function removeARecord(jsonMetadata, ipv4) {
  let metadata = {};

  if (typeof jsonMetadata === 'string') {
    try {
      metadata = JSON.parse(jsonMetadata) || {};
    } catch (e) {
      metadata = {};
    }
  } else if (jsonMetadata && typeof jsonMetadata === 'object') {
    metadata = Object.assign({}, jsonMetadata);
  }

  if (!metadata.ns || !Array.isArray(metadata.ns)) {
    return metadata;
  }

  metadata.ns = metadata.ns.filter(
    record => !(Array.isArray(record) && record[0] === 'A' && record[1] === ipv4)
  );

  return metadata;
}

/**
 * Sets or updates the SSL hash in NS metadata
 * @param {string|Object} jsonMetadata - JSON metadata string or parsed object
 * @param {string} hash - SHA256 hash of SSL certificate public key
 * @returns {Object} Updated metadata object
 */
function setSslHash(jsonMetadata, hash) {
  let metadata = {};

  if (typeof jsonMetadata === 'string') {
    try {
      metadata = JSON.parse(jsonMetadata) || {};
    } catch (e) {
      metadata = {};
    }
  } else if (jsonMetadata && typeof jsonMetadata === 'object') {
    metadata = Object.assign({}, jsonMetadata);
  }

  if (!metadata.ns) {
    metadata.ns = [];
  }
  if (!metadata.ttl) {
    metadata.ttl = DEFAULT_TTL;
  }

  // Remove existing SSL TXT record
  metadata.ns = metadata.ns.filter(
    record => !(Array.isArray(record) && record[0] === 'TXT' && record[1].startsWith('ssl='))
  );

  // Add new SSL TXT record
  metadata.ns.push(createSslTxtRecord(hash));

  return metadata;
}

/**
 * Removes the SSL hash TXT record from NS metadata
 * @param {string|Object} jsonMetadata - JSON metadata string or parsed object
 * @returns {Object} Updated metadata object
 */
function removeSslHash(jsonMetadata) {
  let metadata = {};

  if (typeof jsonMetadata === 'string') {
    try {
      metadata = JSON.parse(jsonMetadata) || {};
    } catch (e) {
      metadata = {};
    }
  } else if (jsonMetadata && typeof jsonMetadata === 'object') {
    metadata = Object.assign({}, jsonMetadata);
  }

  if (!metadata.ns || !Array.isArray(metadata.ns)) {
    return metadata;
  }

  metadata.ns = metadata.ns.filter(
    record => !(Array.isArray(record) && record[0] === 'TXT' && record[1].startsWith('ssl='))
  );

  return metadata;
}

/**
 * Sets the TTL value in NS metadata
 * @param {string|Object} jsonMetadata - JSON metadata string or parsed object
 * @param {number} ttl - TTL value in seconds
 * @returns {Object} Updated metadata object
 * @throws {Error} If TTL value is invalid
 */
function setTtl(jsonMetadata, ttl) {
  if (!isValidTTL(ttl)) {
    throw new Error(`Invalid TTL value: ${ttl}`);
  }

  let metadata = {};

  if (typeof jsonMetadata === 'string') {
    try {
      metadata = JSON.parse(jsonMetadata) || {};
    } catch (e) {
      metadata = {};
    }
  } else if (jsonMetadata && typeof jsonMetadata === 'object') {
    metadata = Object.assign({}, jsonMetadata);
  }

  metadata.ttl = ttl;

  return metadata;
}

/**
 * Checks if metadata contains NS records
 * @param {string|Object} jsonMetadata - JSON metadata string or parsed object
 * @returns {boolean} True if NS records exist
 */
function hasNsRecords(jsonMetadata) {
  const nsData = parseNsMetadata(jsonMetadata);
  return nsData !== null && nsData.ns.length > 0;
}

/**
 * Gets a summary of NS records from metadata
 * @param {string|Object} jsonMetadata - JSON metadata string or parsed object
 * @returns {Object} Summary object with aRecords, sslHash, txtRecords, and ttl
 */
function getNsSummary(jsonMetadata) {
  return {
    aRecords: extractARecords(jsonMetadata),
    sslHash: extractSslHash(jsonMetadata),
    txtRecords: extractTxtRecords(jsonMetadata),
    ttl: extractTtl(jsonMetadata)
  };
}

/**
 * Validates NS metadata structure
 * @param {Object} nsData - NS data object to validate
 * @returns {Object} Validation result with isValid and errors array
 */
function validateNsMetadata(nsData) {
  const errors = [];

  if (!nsData || typeof nsData !== 'object') {
    return { isValid: false, errors: ['NS data must be an object'] };
  }

  // Validate ns array
  if (!Array.isArray(nsData.ns)) {
    errors.push('ns must be an array');
  } else {
    for (let i = 0; i < nsData.ns.length; i++) {
      const record = nsData.ns[i];
      if (!Array.isArray(record) || record.length !== 2) {
        errors.push(`ns[${i}] must be a tuple [type, value]`);
        continue;
      }

      const [type, value] = record;

      if (type === 'A') {
        if (!isValidIPv4(value)) {
          errors.push(`ns[${i}] has invalid IPv4 address: ${value}`);
        }
      } else if (type === 'TXT') {
        if (!isValidTxtRecord(value)) {
          errors.push(`ns[${i}] has invalid TXT record value`);
        }
      } else {
        errors.push(`ns[${i}] has unsupported record type: ${type}`);
      }
    }
  }

  // Validate TTL
  if (nsData.ttl !== undefined && !isValidTTL(nsData.ttl)) {
    errors.push(`Invalid TTL value: ${nsData.ttl}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Export constants
module.exports.DEFAULT_TTL = DEFAULT_TTL;
module.exports.MAX_TXT_LENGTH = MAX_TXT_LENGTH;
module.exports.SHA256_HEX_LENGTH = SHA256_HEX_LENGTH;

// Export validation functions
module.exports.isValidIPv4 = isValidIPv4;
module.exports.isValidSHA256Hash = isValidSHA256Hash;
module.exports.isValidTTL = isValidTTL;
module.exports.isValidTxtRecord = isValidTxtRecord;
module.exports.isValidSslTxtRecord = isValidSslTxtRecord;
module.exports.validateNsMetadata = validateNsMetadata;

// Export record creation functions
module.exports.createARecord = createARecord;
module.exports.createSslTxtRecord = createSslTxtRecord;
module.exports.createTxtRecord = createTxtRecord;
module.exports.createNsMetadata = createNsMetadata;

// Export parsing functions
module.exports.parseNsMetadata = parseNsMetadata;
module.exports.extractARecords = extractARecords;
module.exports.extractSslHash = extractSslHash;
module.exports.extractTxtRecords = extractTxtRecords;
module.exports.extractTtl = extractTtl;
module.exports.getNsSummary = getNsSummary;
module.exports.hasNsRecords = hasNsRecords;

// Export metadata manipulation functions
module.exports.mergeNsMetadata = mergeNsMetadata;
module.exports.removeNsMetadata = removeNsMetadata;
module.exports.addARecord = addARecord;
module.exports.removeARecord = removeARecord;
module.exports.setSslHash = setSslHash;
module.exports.removeSslHash = removeSslHash;
module.exports.setTtl = setTtl;

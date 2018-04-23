const crypto = require('crypto');
const stream = require('stream');

/**
 * A digest stream.
 *
 * @extends stream.PassThrough
 */
class DigestStream extends stream.PassThrough {
  /**
   * Create a new digest stream.
   *
   * @param {Object} [options={}] The digest stream options.
   * @param {String} [options.algorithm='sha1'] The hash algorithm.
   * @param {String} [options.encoding='hex'] The hash encoding.
   */
  constructor(options = {}) {
    super();

    this.algorithm = typeof options.algorithm !== 'undefined' ? options.algorithm : 'sha1';
    this.encoding = typeof options.encoding !== 'undefined' ? options.encoding : 'hex';
    this.hash = crypto.createHash(this.algorithm);

    this.on('data', (chunk, encoding) => {
      this.hash.update(chunk, encoding);
    });

    this.on('finish', () => {
      this.emit('digest', this.hash.digest(this.encoding));
    });
  }
}

/**
 * Create a new digest stream.
 *
 * @param {Object} [options={}] The digest stream options.
 * @param {String} [options.algorithm='sha1'] The hash algorithm.
 * @param {String} [options.encoding='hex'] The hash encoding.
 * @return {DigestStream} the digest stream.
 */
function createDigestStream(options) {
  return new DigestStream(options);
}

exports.DigestStream = DigestStream;
exports.createDigestStream = createDigestStream;

const { DigestStream } = require('../lib');

describe('DigestStream', () => {
  it('create a stream with default options', () => {
    const stream = new DigestStream();

    expect(stream.algorithm).toEqual('sha1');
    expect(stream.encoding).toEqual('hex');
  });

  it('create a stream with custom options', () => {
    const stream = new DigestStream({
      algorithm: 'md5',
      encoding: 'buffer',
    });

    expect(stream.algorithm).toEqual('md5');
    expect(stream.encoding).toEqual('buffer');
  });

  it('digest an input as SHA-1 hexadecimal', () => {
    return new Promise((resolve, reject) => {
      const stream = new DigestStream({
        algorithm: 'sha1',
        encoding: 'hex',
      });

      stream.on('error', (error) => {
        reject(error);
      });

      stream.on('digest', (digest) => {
        expect(typeof digest).toEqual('string');
        expect(digest).toEqual('b58e92fff5246645f772bfe7a60272f356c0151a');

        resolve();
      });

      stream.end('lorem');
    });
  });

  it('digest an input as SHA-1 buffer', () => {
    return new Promise((resolve, reject) => {
      const stream = new DigestStream({
        algorithm: 'sha1',
        encoding: 'buffer',
      });

      stream.on('error', (error) => {
        reject(error);
      });

      stream.on('digest', (digest) => {
        expect(typeof digest).toEqual('object');
        expect(digest).toEqual(Buffer.from([181, 142, 146, 255, 245, 36, 102, 69, 247, 114, 191, 231, 166, 2, 114, 243, 86, 192, 21, 26]));

        resolve();
      });

      stream.end('lorem');
    });
  });

  it('digest an input as MD5 hexadecimal', () => {
    return new Promise((resolve, reject) => {
      const stream = new DigestStream({
        algorithm: 'md5',
        encoding: 'hex',
      });

      stream.on('error', (error) => {
        reject(error);
      });

      stream.on('digest', (digest) => {
        expect(typeof digest).toEqual('string');
        expect(digest).toEqual('d2e16e6ef52a45b7468f1da56bba1953');

        resolve();
      });

      stream.end('lorem');
    });
  });

  it('digest an input as MD5 buffer', () => {
    return new Promise((resolve, reject) => {
      const stream = new DigestStream({
        algorithm: 'md5',
        encoding: 'buffer',
      });

      stream.on('error', (error) => {
        reject(error);
      });

      stream.on('digest', (digest) => {
        expect(typeof digest).toEqual('object');
        expect(digest).toEqual(Buffer.from([210, 225, 110, 110, 245, 42, 69, 183, 70, 143, 29, 165, 107, 186, 25, 83]));

        resolve();
      });

      stream.end('lorem');
    });
  });
});

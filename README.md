# digest-stream

[![Greenkeeper badge](https://badges.greenkeeper.io/Seldszar/digest-stream.svg)](https://greenkeeper.io/)

Another pass-trough stream which calculates the digest of a stream.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Author](#author)
- [License](#license)

## Installation

```bash
npm install seldszar/digest-stream --save
```

## Usage

```javascript
const { createDigestStream } = require('digest-stream');
const fs = require('fs');

const inputStream = fs.createReadStream('/path/to/input');
const outputStream = fs.createWriteStream('/path/to/output');
const digestStream = createDigestStream();

digestStream.on('digest', (digest) => {
  console.log(digest);
});

inputStream.pipe(digestStream);
digestStream.pipe(outputStream);
```

## Author

Alexandre Breteau - [@0xSeldszar](https://twitter.com/0xSeldszar)

## License

MIT © [Alexandre Breteau](https://seldszar.fr)

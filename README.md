qrcode-node-js
==============

Generates QRCode image in PNG format.

This library uses `@zxing/library` to generate the matrix, 
`pngjs` to generate the image, and
a procedure similar to the one found in
[MatrixToImageWriter](https://github.com/zxing/zxing/blob/master/javase/src/main/java/com/google/zxing/client/j2se/MatrixToImageWriter.java) to generate image data from the matrix.

Build:

```
npm run lint
npm run build
```

Run all tests:

```
npm test
```

How to run a single test file:

```
npx mocha test/unit/example.js
```

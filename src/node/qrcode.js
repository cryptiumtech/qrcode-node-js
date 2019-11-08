/*
reference: https://github.com/zxing/zxing/blob/master/javase/src/main/java/com/google/zxing/client/j2se/MatrixToImageWriter.java
*/
const { PNG } = require('pngjs');
const {
    BitArray, QRCodeWriter, BarcodeFormat, EncodeHintType, QRCodeDecoderErrorCorrectionLevel: ErrorCorrectionLevel,
} = require('@zxing/library/esm5');

// r, g, b, a: integers in the range [0,255]
// note that alpha channel values indicate opacity: 0 is transparent, ... 127 is 50% ... 255 is 100% opaque
function RGBA(r, g, b, a) {
    return Buffer.from([r, g, b, a]);
}

// where imageBuffer is a single row, set y=0
// where pixelBuffer is RGBA, pixelBuffer.length === 4
function setRGBA(imageBuffer, width, x, y, pixelBuffer) {
    const start = y * width * pixelBuffer.length + x * pixelBuffer.length;
    pixelBuffer.copy(imageBuffer, start);
}

function bitMatrixToPngBuffer(bitMatrix) {
    const width = bitMatrix.getWidth();
    const height = bitMatrix.getHeight();
    const png = new PNG({
        width,
        height,
        colorType: 6, // RGBA
        bitDepth: 8,
    });
    const onColor = RGBA(0, 0, 0, 255); // black, opaque
    const offColor = RGBA(255, 255, 255, 255); // white, opaque
    const rowBuffer = new BitArray(width);
    for (let y = 0; y < height; y += 1) {
        const row = bitMatrix.getRow(y, rowBuffer);
        for (let x = 0; x < width; x += 1) {
            const pixel = row.get(x) ? onColor : offColor;
            setRGBA(png.data, width, x, y, pixel);
        }
    }
    return PNG.sync.write(png);
}

class QRCode {
    constructor() {
        this.writer = new QRCodeWriter();
    }

    /*
    `text` is the information to encode in the QR Code
    `size` is width and height of a square QR Code, in pixels
    (if you give a non-square dimension to the underlying QRCodeWriter,
        it will simply add whitespace around the square QR Code)
    `options` is comprised of:
    `errorCorrectionLevel` is 'L', 'M' (default), 'Q', or 'H'
    */
    text(text, size, { errorCorrectionLevel = 'M' } = {}) {
        const encodingHints = new Map();
        encodingHints.set(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel[errorCorrectionLevel]);
        const bitMatrix = this.writer.encode(text,
            BarcodeFormat.QR_CODE,
            size, // width
            size, // height
            encodingHints);
        const writable = bitMatrixToPngBuffer(bitMatrix);
        return writable;
    }
}

export { QRCode };

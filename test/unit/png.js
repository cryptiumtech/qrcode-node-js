const fs = require('fs');
const { PNG } = require('pngjs');
const { expect } = require('chai');

describe('generate-png', function () {
    it('1x1', function () {
        const png = new PNG({
            width: 1,
            height: 1,
            colorType: 0, // grayscale, no alpha
            bitDepth: 8,
        });
        // console.log('image data: %o', png.data); // output: <Buffer 00 00 00 00>
        expect(png.data.length).to.equal(4 * 1); // 4 bytes (RGBA) for each pixel, 1x1 image
        fs.mkdirSync('report', { recursive: true });
        const writable = PNG.sync.write(png);
        fs.writeFileSync('report/png1.png', writable);
    });
    it('2x2', function () {
        const png = new PNG({
            width: 2,
            height: 2,
            colorType: 0, // grayscale, no alpha
            bitDepth: 8,
        });
        // console.log('image data: %o', png.data); // output: <Buffer 00 00 00 00>
        expect(png.data.length).to.equal(4 * 4); // 4 bytes (RGBA) for each pixel, 2x2 image
        fs.mkdirSync('report', { recursive: true });
        const writable = PNG.sync.write(png);
        fs.writeFileSync('report/png2.png', writable);
    });
});

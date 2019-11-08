/* eslint-disable func-names */

const fs = require('fs');
const { expect } = require('chai');
const { QRCode } = require('../../dist/index.umd.js');


describe('generate-qrcode', function () {
    it('hello-world', function () {
        const qrcode = new QRCode();
        const imageBuffer = qrcode.text('hello world', 200, { errorCorrectionLevel: 'L' });
        expect(imageBuffer).to.exist;
        fs.mkdirSync('report', { recursive: true });
        fs.writeFileSync('report/qrcode1.png', imageBuffer);
    });
    it('json', function () {
        const json = JSON.stringify({ text: 'hello world' });
        const qrcode = new QRCode();
        const imageBuffer = qrcode.text(json, 200, { errorCorrectionLevel: 'M' });
        expect(imageBuffer).to.exist;
        fs.mkdirSync('report', { recursive: true });
        fs.writeFileSync('report/qrcode2.png', imageBuffer);
    });
    it('url', function () {
        const qrcode = new QRCode();
        const imageBuffer = qrcode.text('https://cryptiumtech.com', 200);
        expect(imageBuffer).to.exist;
        fs.mkdirSync('report', { recursive: true });
        fs.writeFileSync('report/qrcode3.png', imageBuffer);
    });
});

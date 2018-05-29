"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class Generator {
    static GetNumberBetween(min, max) {
        //return Math.floor(Math.random() * max) + min;
        return Math.floor(this.GetCryptoRando() * (max - min) + min);
    }
    static GetCryptoRando() {
        const buffer = crypto.randomBytes(8);
        return this.IntToFloat(parseInt(buffer.toString('hex'), 16));
    }
    static IntToFloat(integer) {
        return integer / Math.pow(2, 64);
    }
}
exports.Generator = Generator;
//# sourceMappingURL=number-generator.controller.js.map
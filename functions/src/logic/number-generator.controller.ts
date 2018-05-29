import * as crypto from "crypto";

export class Generator {
    public static GetNumberBetween(min: number, max: number): number {
        //return Math.floor(Math.random() * max) + min;
        return Math.floor(this.GetCryptoRando() * (max - min) + min);
    }
    private static GetCryptoRando(): number {
        const buffer = crypto.randomBytes(8);
        return this.IntToFloat(parseInt(buffer.toString('hex'), 16));
    }
    private static IntToFloat(integer): number {
        return integer / Math.pow(2, 64);
    }
}
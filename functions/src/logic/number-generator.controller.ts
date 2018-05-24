export class Generator {
    public static GetNumberBetween(min: number, max: number): number {
        return Math.floor(Math.random() * max) + min;
    }
}
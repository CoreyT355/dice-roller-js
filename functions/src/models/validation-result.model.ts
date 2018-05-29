export class ValidationResult {
    isRollValid: boolean;
    invalidRollMessage: string;
    constructor(isValid: boolean, invalidMessage: string) {
        this.isRollValid = isValid;
        this.invalidRollMessage = invalidMessage;
    }
}
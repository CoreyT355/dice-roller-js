"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const number_generator_controller_1 = require("./number-generator.controller");
class RollController {
    rollDemBones(numberOfDice, typeofDice, diceModifier) {
        let rollResult = 0;
        for (let index = 0; index < numberOfDice; index++) {
            rollResult += number_generator_controller_1.Generator.GetNumberBetween(1, typeofDice);
        }
        rollResult += diceModifier || 0;
        return rollResult;
    }
    SplitWhatToRoll(whatToRoll) {
        const numberOfDice = parseInt(whatToRoll.split("d")[0]);
        const typeOfDice = parseInt(whatToRoll.split("d")[1].split("+")[0]);
        let diceModifier;
        if (whatToRoll.indexOf('+') > -1) {
            diceModifier = parseInt(whatToRoll.split("d")[1].split("+")[1]);
        }
        else if (whatToRoll.indexOf('-') > -1) {
            diceModifier = -Math.abs(parseInt(whatToRoll.split("d")[1].split("-")[1]));
        }
        return {
            numberOfDice: numberOfDice,
            typeOfDice: typeOfDice,
            diceModifier: isNaN(diceModifier) ? null : diceModifier
        };
    }
    validateDiceParams(numberOfDice, typeofDice, diceModifier, rulesConfig) {
        let validationResult = {
            isRollValid: true,
            invalidRollMessage: ''
        };
        if (rulesConfig.allowedTypesOfDice.indexOf(typeofDice) == -1) {
            validationResult.isRollValid = false;
            validationResult.invalidRollMessage = `${typeofDice} is not a valid die.`;
            return validationResult;
        }
        if (numberOfDice > rulesConfig.maxNumberOfDice) {
            validationResult.isRollValid = false;
            validationResult.invalidRollMessage = `You can only roll ${rulesConfig.maxNumberOfDice} at a time.`;
            return validationResult;
        }
        if (diceModifier > rulesConfig.maxDiceModifier) {
            validationResult.isRollValid = false;
            validationResult.invalidRollMessage = `${diceModifier} is too damn high.`;
            return validationResult;
        }
        else if (diceModifier < -Math.abs(rulesConfig.maxDiceModifier)) {
            validationResult.isRollValid = false;
            validationResult.invalidRollMessage = `${diceModifier} is too damn low.`;
            return validationResult;
        }
        return validationResult;
    }
}
exports.RollController = RollController;
//# sourceMappingURL=roll.controller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const number_generator_controller_1 = require("./number-generator.controller");
const _ = require("lodash");
class RollController {
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
    rollDemBones(numberOfDice, typeofDice) {
        let rollResult = new Array();
        for (let index = 0; index < numberOfDice; index++) {
            rollResult.push(number_generator_controller_1.Generator.GetNumberBetween(1, typeofDice));
        }
        return rollResult;
    }
    buildResultMessage(rollResults, whatToRoll, diceModifier) {
        let individualResults = `${rollResults.join(', ')}`;
        let message = `Rolled ${whatToRoll}, and got...(${individualResults}) = ${_.sum(rollResults) + diceModifier}`;
        return message;
    }
}
exports.RollController = RollController;
//# sourceMappingURL=roll.controller.js.map
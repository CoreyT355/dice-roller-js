"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const number_generator_controller_1 = require("./number-generator.controller");
const validation_result_model_1 = require("../models/validation-result.model");
const _ = require("lodash");
class RollController {
    static validateDiceParams(numberOfDice, typeofDice, diceModifier, rulesConfig) {
        if (rulesConfig.allowedTypesOfDice.indexOf(typeofDice) === -1) {
            return new validation_result_model_1.ValidationResult(false, `${typeofDice} is not a valid die.`);
        }
        if (numberOfDice > rulesConfig.maxNumberOfDice) {
            return new validation_result_model_1.ValidationResult(false, `You can only roll ${rulesConfig.maxNumberOfDice} at a time.`);
        }
        if (diceModifier > rulesConfig.maxDiceModifier) {
            return new validation_result_model_1.ValidationResult(false, `${diceModifier} is too damn high.`);
        }
        else if (diceModifier < -Math.abs(rulesConfig.maxDiceModifier)) {
            return new validation_result_model_1.ValidationResult(false, `${diceModifier} is too damn low.`);
        }
        return new validation_result_model_1.ValidationResult(true, ``);
        ;
    }
    static SplitWhatToRoll(whatToRoll) {
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
    static rollDemBones(numberOfDice, typeofDice) {
        const rollResult = new Array();
        for (let index = 0; index < numberOfDice; index++) {
            rollResult.push(number_generator_controller_1.Generator.GetNumberBetween(1, typeofDice));
        }
        return rollResult;
    }
    static buildResultMessage(rollResults, whatToRoll, diceModifier) {
        return `Rolled ${whatToRoll}, and got...(${rollResults.join(', ')}) = ${_.sum(rollResults) + diceModifier}`;
    }
}
exports.RollController = RollController;
//# sourceMappingURL=roll.controller.js.map
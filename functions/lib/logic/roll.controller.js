"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const number_generator_controller_1 = require("./number-generator.controller");
const validation_result_model_1 = require("../models/validation-result.model");
const SlackResponse = require("../models/slack.model");
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
        if (diceModifier < -Math.abs(rulesConfig.maxDiceModifier)) {
            return new validation_result_model_1.ValidationResult(false, `${diceModifier} is too damn low.`);
        }
        return new validation_result_model_1.ValidationResult(true, ``);
    }
    static splitWhatToRoll(whatToRoll) {
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
    static rollAdvantage() {
        return this.rollDemBones(2, 20);
    }
    static rollDemBones(numberOfDice, typeofDice) {
        const rollResult = new Array();
        for (let index = 0; index < numberOfDice; index++) {
            rollResult.push(number_generator_controller_1.Generator.GetNumberBetween(1, typeofDice));
        }
        return rollResult;
    }
    static buildResultMessage(responseToSlack, rollResults, whatToRoll, diceModifier) {
        let critMessage = '';
        let critColor = '';
        if (whatToRoll.indexOf('d20') > -1) {
            if (_.find(rollResults, roll => roll === 1)) {
                critMessage = 'Oh no! Crit fail!';
                critColor = 'danger';
            }
            else if (_.find(rollResults, roll => roll === 20)) {
                critMessage = 'Hell yeah! Critical hit!';
                critColor = 'good';
            }
        }
        responseToSlack.response_type = 'in_channel';
        responseToSlack.text = `Rolled ${whatToRoll}, and got...(${rollResults.join(', ')}) = ${_.sum(rollResults) + diceModifier}`;
        if (critMessage !== null) {
            responseToSlack.attachments = new Array(new SlackResponse.Attachment(critColor, critMessage));
        }
        return responseToSlack;
    }
    static buildAdvantageResultMessage(responseToSlack, rollResults, diceModifier) {
        let critMessage = '';
        let critColor = '';
        if (rollResults.indexOf(20) > -1) {
            if (_.find(rollResults, roll => roll === 1)) {
                critMessage = 'Oh no! Crit fail!';
                critColor = 'danger';
            }
            else if (_.find(rollResults, roll => roll === 20)) {
                critMessage = 'Hell yeah! Critical hit!';
                critColor = 'good';
            }
        }
        responseToSlack.response_type = 'in_channel';
        responseToSlack.text = `Rolled with advantage, and got...(${rollResults.join(', ')}) = ${_.max(rollResults) + diceModifier}`;
        if (critMessage !== null) {
            responseToSlack.attachments = new Array(new SlackResponse.Attachment(critColor, critMessage));
        }
        return responseToSlack;
    }
    static buildDisadvantageResultMessage(responseToSlack, rollResults, diceModifier) {
        let critMessage = '';
        let critColor = '';
        if (rollResults.indexOf(20) > -1) {
            if (_.find(rollResults, roll => roll === 1)) {
                critMessage = 'Oh no! Crit fail!';
                critColor = 'danger';
            }
            else if (_.find(rollResults, roll => roll === 20)) {
                critMessage = 'Hell yeah! Critical hit!';
                critColor = 'good';
            }
        }
        responseToSlack.response_type = 'in_channel';
        responseToSlack.text = `Rolled with disadvantage, and got...(${rollResults.join(', ')}) = ${_.min(rollResults) + diceModifier}`;
        if (critMessage !== null) {
            responseToSlack.attachments = new Array(new SlackResponse.Attachment(critColor, critMessage));
        }
        return responseToSlack;
    }
}
exports.RollController = RollController;
//# sourceMappingURL=roll.controller.js.map
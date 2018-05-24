"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const number_generator_controller_1 = require("./number-generator.controller");
class RollController {
    static rollDemBones(numberOfDice, typeofDice, diceModifier) {
        let rollResult = 0;
        for (let index = 0; index < numberOfDice; index++) {
            rollResult += number_generator_controller_1.Generator.GetNumberBetween(1, typeofDice);
        }
        rollResult += diceModifier || 0;
        return rollResult;
    }
    static SplitWhatToRoll(whatToRoll) {
        const numberOfDice = parseInt(whatToRoll.split('d')[0]);
        const typeOfDice = parseInt(whatToRoll.split('d')[1].split('+')[0]);
        const diceModifier = (parseInt(whatToRoll.split('d')[1].split('+')[1]));
        return {
            numberOfDice: numberOfDice,
            typeOfDice: typeOfDice,
            diceModifier: isNaN(diceModifier) ? null : diceModifier
        };
    }
}
exports.RollController = RollController;
//# sourceMappingURL=roll.controller.js.map
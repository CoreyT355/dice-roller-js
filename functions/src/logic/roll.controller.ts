import { Generator } from "./number-generator.controller";
export class RollController {
    public static rollDemBones(numberOfDice: number, typeofDice: number, diceModifier: number): number {
        let rollResult = 0;
        for (let index = 0; index < numberOfDice; index++) {
            rollResult += Generator.GetNumberBetween(1, typeofDice);
        }
        rollResult += diceModifier || 0;
        return rollResult;
    }
    public static SplitWhatToRoll(whatToRoll: string): any {
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
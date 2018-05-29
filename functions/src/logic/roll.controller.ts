import { Generator } from "./number-generator.controller";
import { ValidationResult } from "../models/validation-result.model";
import * as _ from 'lodash';

export class RollController {
  public static validateDiceParams(
    numberOfDice: number,
    typeofDice: number,
    diceModifier: number,
    rulesConfig: any
  ) {
    if (rulesConfig.allowedTypesOfDice.indexOf(typeofDice) === -1) {
        return new ValidationResult(false, `${typeofDice} is not a valid die.`);
    }
    if (numberOfDice > rulesConfig.maxNumberOfDice) {
        return new ValidationResult(false, `You can only roll ${rulesConfig.maxNumberOfDice} at a time.`);
    }
    if (diceModifier > rulesConfig.maxDiceModifier) {
        return new ValidationResult(false, `${diceModifier} is too damn high.`);
    } else if (diceModifier < -Math.abs(rulesConfig.maxDiceModifier)) {
      return new ValidationResult(false, `${diceModifier} is too damn low.`);
    }
    return new ValidationResult(true, ``);;
  }
  public static SplitWhatToRoll(whatToRoll: string): any {
    const numberOfDice = parseInt(whatToRoll.split("d")[0]);
    const typeOfDice = parseInt(whatToRoll.split("d")[1].split("+")[0]);
    let diceModifier: number;
    if (whatToRoll.indexOf('+') > -1) {
      diceModifier = parseInt(whatToRoll.split("d")[1].split("+")[1]);
    } else if (whatToRoll.indexOf('-') > -1) {
      diceModifier = -Math.abs(parseInt(whatToRoll.split("d")[1].split("-")[1]));
    }
    return {
      numberOfDice: numberOfDice,
      typeOfDice: typeOfDice,
      diceModifier: isNaN(diceModifier) ? null : diceModifier
    };
  }
  public static rollDemBones(
    numberOfDice: number,
    typeofDice: number
  ): number[] {
    const rollResult = new Array<number>();
    for (let index = 0; index < numberOfDice; index++) {
      rollResult.push(Generator.GetNumberBetween(1, typeofDice));
    }
    return rollResult;
  }
  public static buildResultMessage(rollResults: number[], whatToRoll: string, diceModifier: number) {
    return `Rolled ${whatToRoll}, and got...(${rollResults.join(', ')}) = ${_.sum(rollResults) + diceModifier}`;
  }
}

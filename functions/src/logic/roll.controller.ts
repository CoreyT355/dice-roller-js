import { Generator } from "./number-generator.controller";
import * as _ from 'lodash';

export class RollController {
  public validateDiceParams(
    numberOfDice: number,
    typeofDice: number,
    diceModifier: number,
    rulesConfig: any
  ) {
    
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
    } else if (diceModifier < -Math.abs(rulesConfig.maxDiceModifier)) {
      validationResult.isRollValid = false;
      validationResult.invalidRollMessage = `${diceModifier} is too damn low.`;
      return validationResult;
    }
    return validationResult;
  }
  public SplitWhatToRoll(whatToRoll: string): any {
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
  public rollDemBones(
    numberOfDice: number,
    typeofDice: number
  ): number[] {
    let rollResult = new Array<number>();
    for (let index = 0; index < numberOfDice; index++) {
      rollResult.push(Generator.GetNumberBetween(1, typeofDice));
    }
    return rollResult;
  }
  public buildResultMessage(rollResults: number[], whatToRoll: string, diceModifier: number) {
    let individualResults = `${rollResults.join(', ')}`;
    let message = `Rolled ${whatToRoll}, and got...(${individualResults}) = ${_.sum(rollResults) + diceModifier}`;
    return message;
  }
}

import { Generator } from "./number-generator.controller";
import { ValidationResult } from "../models/validation-result.model";
import * as SlackResponse from "../models/slack.model";

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
    } 
    if (diceModifier < -Math.abs(rulesConfig.maxDiceModifier)) {
      return new ValidationResult(false, `${diceModifier} is too damn low.`);
    }
    return new ValidationResult(true, ``);
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
  public static rollAdvantage() {
    return this.rollDemBones(2, 20);
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
  public static buildResultMessage(responseToSlack: SlackResponse.Response, rollResults: number[], whatToRoll: string, diceModifier: number) {
    let critMessage = '';
    let critColor = '';
    if (whatToRoll.indexOf('d20') > -1) {
      if (_.find(rollResults, roll => roll === 1)) {
        critMessage = 'Oh no! Crit fail!';
        critColor = 'danger';
      } else if (_.find(rollResults, roll => roll === 20)) {
        critMessage = 'Hell yeah! Critical hit!';
        critColor = 'good';
      }
    }
    responseToSlack.response_type = 'in_channel';
    responseToSlack.text = `Rolled ${whatToRoll}, and got...(${rollResults.join(', ')}) = ${_.sum(rollResults) + diceModifier}`;
    if (critMessage !== null) {
      responseToSlack.attachments = new Array<SlackResponse.Attachment>(new SlackResponse.Attachment(critColor, critMessage));
    }
    return responseToSlack;
  }
}

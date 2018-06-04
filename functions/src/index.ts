import * as functions from 'firebase-functions';
import * as Slack from './models/slack.model';
import * as _ from "lodash";
import { RollController } from './logic/roll.controller';
import { Config } from "./lame.config";

const slackRes = new Slack.Response();
const allowedTokens = [
    "uTzgipm2SXe415vtiVH4gbUz"
];
export const rollDice = functions.https.onRequest(async (req, res) => {
    const requestBody = req.body;
    if (!allowedTokens.find(token => { return token === requestBody.token; })) {
        slackRes.response_type = 'ephemeral';
        slackRes.text = `Auth Failed: broken token`;
        return res.status(418).send(slackRes);
    }
    if (requestBody.text.includes('advantage')) {
        const diceModifier = requestBody.text.split('+')[1];
        const rollResult = RollController.rollAdvantage();
        const highRoll = _.max(rollResult);
        const advantageResult = highRoll + diceModifier;
    }
    if (requestBody.text.includes('disadvantage')) {
        const diceModifier = requestBody.text.split('+')[1];
        const rollResult = RollController.rollAdvantage();
        const lowRoll = _.min(rollResult);
        const advantageResult = lowRoll + diceModifier;
    }
    const rollParams = RollController.splitWhatToRoll(requestBody.text);
    const validationResult = RollController.validateDiceParams(rollParams.numberOfDice, rollParams.typeOfDice, rollParams.diceModifier, Config.rollRules);
    if (validationResult.isRollValid === false) {
        slackRes.response_type = 'ephemeral';
        slackRes.text = validationResult.invalidRollMessage;
        return res.status(200).send(slackRes);    
    }
    const result = RollController.rollDemBones(rollParams.numberOfDice, rollParams.typeOfDice);
    return res.status(200).send(RollController.buildResultMessage(slackRes, result, requestBody.text, rollParams.diceModifier));
});
export const rollStat = functions.https.onRequest(async (req, res) => {
    const requestBody = req.body;  
    if (!allowedTokens.find(token => { return token === requestBody.token; })) {
        slackRes.response_type = 'ephemeral';
        slackRes.text = `Auth Failed: broken token`;
        return res.status(418).send(slackRes);
    }
    return res.status(200).send({ message: 'not implemented yet' });
});
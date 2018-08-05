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
    if (requestBody.text.includes('dis')) {
        const rollResult = RollController.rollAdvantage();
        return res.status(200).send(RollController.buildDisadvantageResultMessage(slackRes, rollResult, parseInt(requestBody.text.split('+')[1])));
    }
    if (requestBody.text.includes('adv')) {
        const rollResult = RollController.rollAdvantage();
        return res.status(200).send(RollController.buildAdvantageResultMessage(slackRes, rollResult, parseInt(requestBody.text.split('+')[1])));
    }
    let curtModifier = 0;
    if (requestBody.text.includes('c')) {
        curtModifier = RollController.rollDemBones(1, 15)[0];
        requestBody.text = requestBody.text.replace('c', 'd');
    }
    const rollParams = RollController.splitWhatToRoll(requestBody.text);
    const validationResult = RollController.validateDiceParams(rollParams.numberOfDice, rollParams.typeOfDice, rollParams.diceModifier, Config.rollRules);
    if (validationResult.isRollValid === false) {
        slackRes.response_type = 'ephemeral';
        slackRes.text = validationResult.invalidRollMessage;
        return res.status(200).send(slackRes);    
    }
    const result = RollController.rollDemBones(rollParams.numberOfDice, rollParams.typeOfDice);
    return res.status(200).send(RollController.buildResultMessage(slackRes, result, requestBody.text, curtModifier ? rollParams.diceModifier + curtModifier : rollParams.diceModifier));
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
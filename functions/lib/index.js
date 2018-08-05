"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const Slack = require("./models/slack.model");
const roll_controller_1 = require("./logic/roll.controller");
const lame_config_1 = require("./lame.config");
const slackRes = new Slack.Response();
const allowedTokens = [
    "uTzgipm2SXe415vtiVH4gbUz"
];
exports.rollDice = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const requestBody = req.body;
    if (!allowedTokens.find(token => { return token === requestBody.token; })) {
        slackRes.response_type = 'ephemeral';
        slackRes.text = `Auth Failed: broken token`;
        return res.status(418).send(slackRes);
    }
    if (requestBody.text.includes('dis')) {
        const rollResult = roll_controller_1.RollController.rollAdvantage();
        return res.status(200).send(roll_controller_1.RollController.buildDisadvantageResultMessage(slackRes, rollResult, parseInt(requestBody.text.split('+')[1])));
    }
    if (requestBody.text.includes('adv')) {
        const rollResult = roll_controller_1.RollController.rollAdvantage();
        return res.status(200).send(roll_controller_1.RollController.buildAdvantageResultMessage(slackRes, rollResult, parseInt(requestBody.text.split('+')[1])));
    }
    let curtModifier = 0;
    if (requestBody.text.includes('c')) {
        curtModifier = roll_controller_1.RollController.rollDemBones(1, 15)[0];
        requestBody.text = requestBody.text.replace('c', 'd');
    }
    const rollParams = roll_controller_1.RollController.splitWhatToRoll(requestBody.text);
    const validationResult = roll_controller_1.RollController.validateDiceParams(rollParams.numberOfDice, rollParams.typeOfDice, rollParams.diceModifier, lame_config_1.Config.rollRules);
    if (validationResult.isRollValid === false) {
        slackRes.response_type = 'ephemeral';
        slackRes.text = validationResult.invalidRollMessage;
        return res.status(200).send(slackRes);
    }
    const result = roll_controller_1.RollController.rollDemBones(rollParams.numberOfDice, rollParams.typeOfDice);
    return res.status(200).send(roll_controller_1.RollController.buildResultMessage(slackRes, result, requestBody.text, curtModifier ? rollParams.diceModifier + curtModifier : rollParams.diceModifier));
}));
exports.rollStat = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const requestBody = req.body;
    if (!allowedTokens.find(token => { return token === requestBody.token; })) {
        slackRes.response_type = 'ephemeral';
        slackRes.text = `Auth Failed: broken token`;
        return res.status(418).send(slackRes);
    }
    return res.status(200).send({ message: 'not implemented yet' });
}));
//# sourceMappingURL=index.js.map
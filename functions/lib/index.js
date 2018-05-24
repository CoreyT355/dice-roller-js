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
exports.rollDice = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const slackRes = new Slack.Response();
    const allowedTokens = [
        "ZPLkPLJKwgo3oSVldYcEhtHn",
        "nzuisV6QeBIWv83VEiJV8E1m",
        "QqCPp9777BuQAMzt3xMZ512K",
        "uTzgipm2SXe415vtiVH4gbUz"
    ];
    const authToken = req.query.token;
    if (!allowedTokens.find(token => { return token === authToken; })) {
        slackRes.response_type = 'ephemeral';
        slackRes.text = `Auth Failed: broken token`;
        res.status(418).send(slackRes);
    }
    const rollParams = roll_controller_1.RollController.SplitWhatToRoll(req.query.whatToRoll);
    const result = roll_controller_1.RollController.rollDemBones(rollParams.numberOfDice, rollParams.typeOfDice, rollParams.diceModifier);
    slackRes.response_type = 'in_channel';
    slackRes.text = `Your result is....${result}`;
    res.status(200).send(slackRes);
}));
//# sourceMappingURL=index.js.map
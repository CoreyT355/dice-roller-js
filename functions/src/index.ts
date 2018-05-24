import * as functions from 'firebase-functions';
import * as Slack from './models/slack.model';
import { RollController } from './logic/roll.controller';
export const rollDice = functions.https.onRequest(async (req, res) => {
    const requestBody = req.body;
    const slackRes = new Slack.Response();
    const allowedTokens = [
        "uTzgipm2SXe415vtiVH4gbUz"
    ];     
    const authToken = requestBody.token;
    if (!allowedTokens.find(token => { return token === authToken; })) {
        slackRes.response_type = 'ephemeral';
        slackRes.text = `Auth Failed: broken token`;
        res.status(418).send(slackRes);
    }
    const rollParams = RollController.SplitWhatToRoll(requestBody.text);
    const result = RollController.rollDemBones(rollParams.numberOfDice, rollParams.typeOfDice, rollParams.diceModifier);
    slackRes.response_type = 'in_channel';
    slackRes.text = `Rolled ${requestBody.text}, and got...${result}`;
    res.status(200).send(slackRes);
});
import * as functions from 'firebase-functions';
import * as Slack from './models/slack.model';
import { RollController } from './logic/roll.controller';
export const rollDice = functions.https.onRequest(async (req, res) => {
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
    const rollParams = RollController.SplitWhatToRoll(req.query.whatToRoll);
    const result = RollController.rollDemBones(rollParams.numberOfDice, rollParams.typeOfDice, rollParams.diceModifier);
    slackRes.response_type = 'in_channel';
    slackRes.text = `Your result is....${result}`;
    res.status(200).send(slackRes);
});


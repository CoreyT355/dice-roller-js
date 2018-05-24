"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    constructor() {
        this.response_type = 'in_channel';
        this.attachments = new Array();
    }
}
exports.Response = Response;
class Attachment {
    constructor() {
        this.fields = new Array();
        this.color = 'good';
    }
}
exports.Attachment = Attachment;
class Fields {
}
exports.Fields = Fields;
//# sourceMappingURL=slack.model.js.map
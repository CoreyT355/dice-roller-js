"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    constructor() {
        this.response_type = 'in_channel';
    }
}
exports.Response = Response;
class Attachment {
    constructor(color, text, fields = null) {
        this.color = color;
        this.text = text;
        this.fields = fields;
    }
}
exports.Attachment = Attachment;
class Fields {
}
exports.Fields = Fields;
//# sourceMappingURL=slack.model.js.map
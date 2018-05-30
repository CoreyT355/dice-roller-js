export class Response {
    response_type: string;
    text: any;
    attachments: Attachment[];

    constructor() {
        this.response_type = 'in_channel';
    }
}

export class Attachment {
    color: string;
    text:  string;
    fields: Fields[];
    constructor(color: string, text: string, fields: Array<Fields> = null) {
        this.color = color;
        this.text = text;
        this.fields = fields;
    }
}

export class Fields {
    title: string;
    value: string;
    short: string;
}

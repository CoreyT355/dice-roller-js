export class Response {
    response_type: string;
    text: any;
    attachments: Attachment[];

    constructor() {
        this.response_type = 'in_channel';
        this.attachments = new Array<Attachment>();
    }
}

export class Attachment {
    color: string;
    fields: Fields[];

    constructor() {
        this.fields = new Array<Fields>();
        this.color = 'good';
    }
}

export class Fields {
    title: string;
    value: string;
    short: string;
}

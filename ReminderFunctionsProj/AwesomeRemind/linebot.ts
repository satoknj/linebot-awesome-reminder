import { RemindedAt, RemindMessage } from "../RemindDomain";
import { Client, ClientConfig, TemplateMessage, Action } from "@line/bot-sdk";

export class LinebotGatewayImpl {
    private readonly client: Client;
    private readonly userId: string;
    
    constructor() {
        const clientCOnfig: ClientConfig = {
            channelAccessToken: process.env.LinebotChannelAccessToken,
            channelSecret: process.env.LinebotChannelSecret
        }
        this.client = new Client(clientCOnfig);
        this.userId = process.env.LinebotUserId;
    }
    
    send(remindMessage: RemindMessage, remindedAt: RemindedAt) {
        const actions: Action[] = remindMessage.replyChoices.map((value) => {
            return {
                type: 'postback',
                label: value,
                displayText: value,
                data: `action=${value}&timestamp=${remindedAt.format()}&kind=${remindMessage.kind}`
            };
        });
        const message: TemplateMessage = {
            type: 'template',
            altText: 'お薬リマインド',
            template: {
                type: 'buttons',
                title: 'リマインド',
                text: remindMessage.message,
                actions: actions
            }
        };
        this.client.pushMessage(this.userId, message);
    }
}
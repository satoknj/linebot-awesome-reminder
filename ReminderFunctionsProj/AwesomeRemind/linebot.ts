import { RemindMessage } from "./domain";
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
    
    send(remindMessage: RemindMessage) {
        const actions: Action[] = remindMessage.replyChoices.map((value) => {
            return {
                type: 'postback',
                label: value,
                displayText: value,
                data: `action=${value}`
            };
        });
        const message: TemplateMessage = {
            type: 'template',
            altText: 'hoge',
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
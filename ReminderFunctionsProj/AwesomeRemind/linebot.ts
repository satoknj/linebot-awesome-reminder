import { RemindMessage } from "./domain";
import { Client, ClientConfig } from "@line/bot-sdk";

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
        this.client.pushMessage(this.userId, {
            type: 'text',
            text: remindMessage.message
        });
    }
}
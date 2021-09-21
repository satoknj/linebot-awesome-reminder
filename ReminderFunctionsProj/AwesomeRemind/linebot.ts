import { RemindMessage } from "./function";
import { Client, ClientConfig } from "@line/bot-sdk";

export function send(remindMessage: RemindMessage) {
    console.log(remindMessage.message);
    console.log(remindMessage.replyChoices);
    console.log(remindMessage.daysOfWeek);
    console.log(remindMessage.timing);
    
    const bot = new LinebotGatewayImpl();
    bot.send();
}

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
    
    send() {
        this.client.pushMessage(this.userId, {
            type: 'text',
            text: '朝のお薬飲んだ？'
        });
    }
}
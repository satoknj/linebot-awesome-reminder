import { send } from "./linebot";
import * as dayjs from 'dayjs';
import timerTrigger from ".";

export class RemindMessage {
    readonly message: string;
    readonly replyChoices: string[];
    readonly daysOfWeek: number[];
    readonly hour: number;
    readonly minute: number;
    
    constructor() {
        this.message = "朝の薬飲んだ？";
        this.replyChoices = ["Done", "Later"];
        this.daysOfWeek = [2, 3, 4, 5, 7];
        this.hour = 6;
        this.minute = 45;
    }
}

export interface LinebotGateway {
    send(remindMessage: RemindMessage): void;
}

export class Reminder {
    private readonly linebotGateway;

    constructor(linebotGateway: LinebotGateway) {
        this.linebotGateway = linebotGateway;
    }
    
    remind(timpeStamp: dayjs.Dayjs) {
        const remindMessage = new RemindMessage();
        
        if (timpeStamp.hour() === remindMessage.hour && timpeStamp.minute() === remindMessage.minute) {
            this.linebotGateway.send(remindMessage);
            console.log('from exported func!' + timpeStamp.toString());
        }
    }
}

export function botFunction(timpeStamp: Date) {
    const remindMessage = new RemindMessage();
    send(remindMessage);
    console.log('from exported func!' + timpeStamp.toString());
}

import { send } from "./linebot";

export class RemindMessage {
    readonly message: string;
    readonly replyChoices: string[];
    readonly daysOfWeek: number[];
    readonly timing: string
    
    constructor() {
        this.message = "朝の薬飲んだ？";
        this.replyChoices = ["Done", "Later"];
        this.daysOfWeek = [2, 3, 4, 5, 7];
        this.timing = "06:45";
    }
}

export function botFunction(timpeStamp: Date) {
    const remindMessage = new RemindMessage();
    send(remindMessage);
    console.log('from exported func!' + timpeStamp.toString());
}

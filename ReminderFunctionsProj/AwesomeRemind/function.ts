import { send } from "./linebot";

export class RemindMessage {
    readonly message: String;
    readonly replyChoices: String[];
    readonly daysOfWeek: Number[];
    readonly timing: String
    
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

import { RemindMessage } from "./function";

export function send(remindMessage: RemindMessage) {
    console.log(remindMessage.message);
    console.log(remindMessage.replyChoices);
    console.log(remindMessage.daysOfWeek);
    console.log(remindMessage.timing);
}
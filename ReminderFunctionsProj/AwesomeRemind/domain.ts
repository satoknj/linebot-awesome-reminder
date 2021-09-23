import dayjs = require("dayjs");

export class RemindTiming {
    readonly daysOfWeek: number[];
    readonly hour: number;
    readonly minute: number;

    constructor(daysOfWeek: number[], hour: number, minute: number) {
        this.daysOfWeek = daysOfWeek;
        this.hour = hour;
        this.minute = minute;
    }
    
    isRemindTiming(d: dayjs.Dayjs): boolean {
        return d.hour() === this.hour
        && d.minute() === this.minute;
    }
}

export class RemindMessage {
    readonly message: string;
    readonly replyChoices: string[];
    readonly remindTiming: RemindTiming;
    
    constructor() {
        this.message = "朝の薬飲んだ？";
        this.replyChoices = ["Done", "Later"];
        this.remindTiming = new RemindTiming(
            [2, 3, 4, 5, 7],
            6,
            45
        );
    }
}
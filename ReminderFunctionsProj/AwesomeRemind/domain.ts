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
        this.replyChoices = ["done", "later"];
        this.remindTiming = new RemindTiming(
            [2, 3, 4, 5, 7],
            6,
            45
        );
    }
}

export const Kind = { BreakfirstMedicine: 'breakfirstMedicine', FillBath: 'fillBath' } as const;
export type Kind = typeof Kind[keyof typeof Kind];

export class SentMessage {
    readonly kind: Kind;
    readonly message: string;
    readonly datetime: dayjs.Dayjs;
    readonly snoozes: dayjs.Dayjs[];
    readonly reply: string;

    constructor(kind: Kind, message: string, datetime: dayjs.Dayjs) {
        this.kind = kind;
        this.message = message;
        this.datetime = datetime;
        this.snoozes = [];
        this.reply = '';
    }
}
export interface SentMessageRepository {
    save(SentMessage: SentMessage): void;
}
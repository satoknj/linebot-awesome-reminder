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

export const Kind = { BreakfirstMedicine: 'BreakfirstMedicine', FillBath: 'FillBath' } as const;
export type Kind = typeof Kind[keyof typeof Kind];
export class RemindMessage {
    readonly kind: Kind;
    readonly message: string;
    readonly replyChoices: string[];
    readonly remindTiming: RemindTiming;
    
    constructor() {
        this.kind = Kind.BreakfirstMedicine;
        this.message = "朝の薬飲んだ？";
        this.replyChoices = ["done", "later"];
        this.remindTiming = new RemindTiming(
            [2, 3, 4, 5, 7],
            6,
            45
        );
    }
    
    toSentMessage(kind: Kind, datetime: dayjs.Dayjs): SentMessage {
        return new SentMessage(
            kind,
            this.message,
            datetime,
            [],
            ''
        )
    }
}

export class SentMessage {
    readonly kind: Kind;
    readonly message: string;
    readonly datetime: dayjs.Dayjs;
    readonly snoozes: dayjs.Dayjs[];
    readonly reply: string;

    constructor(kind: Kind, message: string, datetime: dayjs.Dayjs, snoozes: dayjs.Dayjs[], reply: string) {
        this.kind = kind;
        this.message = message;
        this.datetime = datetime.second(0).millisecond(0);
        this.snoozes = snoozes;
        this.reply = reply;
    }
}
export interface SentMessageRepository {
    find(id: string, kind: Kind): Promise<SentMessage>;
    create(sentMessage: SentMessage): void;
    updateReply(sentMessage: SentMessage, reply: string): void;
}
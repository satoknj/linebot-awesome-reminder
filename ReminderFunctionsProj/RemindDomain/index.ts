import dayjs = require("dayjs");
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat)

export class RemindedAt {
    readonly value: dayjs.Dayjs;
    private static readonly DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ[Z]';

    constructor(value: dayjs.Dayjs) {
        this.value = value.second(0).millisecond(0);
    }
    
    format(): string {
        return this.value.format(RemindedAt.DATE_FORMAT);
    }
    
    static create(source: string): RemindedAt {
        const value = dayjs(source, RemindedAt.DATE_FORMAT);
        return new RemindedAt(value);
    }
    
}
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
export const Reply = { None: 'None', Done: 'Done', Stop: 'Stop' } as const;
export type Reply = typeof Reply[keyof typeof Reply];

export class RemindMessage {
    readonly kind: Kind;
    readonly message: string;
    readonly replyChoices: string[];
    readonly remindTiming: RemindTiming;
    
    constructor() {
        this.kind = Kind.BreakfirstMedicine;
        this.message = "朝の薬飲んだ？";
        this.replyChoices = Object.values(Reply).filter(v => v !== Reply.None);
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
            Reply.None
        )
    }
}

export class SentMessage {
    readonly kind: Kind;
    readonly message: string;
    readonly remindedAt: RemindedAt;
    readonly snoozes: dayjs.Dayjs[];
    reply: Reply;

    constructor(kind: Kind, message: string, datetime: dayjs.Dayjs | RemindedAt, snoozes: dayjs.Dayjs[], reply: Reply) {
        this.kind = kind;
        this.message = message;
        this.snoozes = snoozes;
        this.reply = reply;
        
        if (datetime instanceof RemindedAt) {
            this.remindedAt = datetime;
        } else {
            this.remindedAt = new RemindedAt(datetime);
        }
    }
}
export interface SentMessageRepository {
    find(remindedAt: RemindedAt, kind: Kind): Promise<SentMessage>;
    create(sentMessage: SentMessage): void;
    update(sentMessage: SentMessage): void;
}
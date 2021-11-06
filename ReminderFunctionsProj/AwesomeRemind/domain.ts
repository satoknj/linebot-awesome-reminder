import dayjs = require("dayjs");
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat)

export class RemindedAt {
    readonly value: dayjs.Dayjs;
    private static readonly DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ[Z]';

    constructor(value: dayjs.Dayjs) {
        this.value = value;
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
    readonly remindedAt: RemindedAt;
    readonly snoozes: dayjs.Dayjs[];
    readonly reply: string;

    constructor(kind: Kind, message: string, datetime: dayjs.Dayjs | RemindedAt, snoozes: dayjs.Dayjs[], reply: string) {
        this.kind = kind;
        this.message = message;
        this.snoozes = snoozes;
        this.reply = reply;
        
        if (datetime instanceof RemindedAt) {
            this.remindedAt = datetime;
        } else {
            // TODO 秒以下を扱わないこともValue Object で吸収する
            this.remindedAt = new RemindedAt(datetime.second(0).millisecond(0));
        }
    }
}
export interface SentMessageRepository {
    find(id: string, kind: Kind): Promise<SentMessage>;
    create(sentMessage: SentMessage): void;
    updateReply(sentMessage: SentMessage, reply: string): void;
}
import { Kind, RemindMessage, RemindTiming, RemindedAt } from ".";
import dayjs = require("dayjs");

describe('remindTiming', () => {;
    const baseDatetime = dayjs('2021-09-22 06:45:00.000');
    const sut = new RemindTiming([1,2,3,4,5,6,7], 6, 45);

    describe.each([
        { hour: 5, expected: false},
        { hour: 6, expected: true},
        { hour: 7, expected: false},
    ])('hour', ({hour, expected}) => {
        test(`${expected} with ${hour}`, () => {
            const now = baseDatetime.set('hour', hour);
            expect(sut.isRemindTiming(now)).toBe(expected);
        });
    });

    describe.each([
        { minute: 0, expected: false},
        { minute: 15, expected: false},
        { minute: 30, expected: false},
        { minute: 45, expected: true},
    ])('minute', ({minute, expected}) => {
        test(`${expected} with ${minute}`, () => {
            const now = baseDatetime.set('minute', minute);
            expect(sut.isRemindTiming(now)).toBe(expected);
        });
    });
});

describe('SentMessage', () => {
    test('constructor', () => {
        const remindMessage = new RemindMessage();
        const sut = remindMessage.toSentMessage(Kind.BreakfirstMedicine, dayjs('2021-10-12 07:00:05.222'));

        expect(sut.kind).toBe(Kind.BreakfirstMedicine);
        expect(sut.message).toBe('朝の薬飲んだ？');
        expect(sut.remindedAt.value).toEqual(dayjs('2021-10-12 07:00:00.000'));
        expect(sut.snoozes).toEqual([]);
        expect(sut.reply).toEqual('');
    });
});

describe('RemindedAt', () => {
    test('format', () => {
        const sut = new RemindedAt(dayjs('2021-11-06 06:45:00.000'));

        expect(sut.format()).toBe('2021-11-06T06:45:00+09:00Z');
    });

    test('create', () => {
        const source ='2021-11-06T06:45:00+09:00Z';
        const actual = RemindedAt.create(source);

        const expected = new RemindedAt(dayjs('2021-11-06 06:45:00'));
        const diff = actual.value.diff(expected.value);
        
        expect(diff).toBe(0);
    });
});
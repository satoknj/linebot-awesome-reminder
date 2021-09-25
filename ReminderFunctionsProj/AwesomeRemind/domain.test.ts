import { RemindTiming } from "./domain";
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
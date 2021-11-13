import dayjs = require('dayjs');
import { Kind } from '../RemindDomain';
import { PostBackData } from "./models";

describe('PostbackData', () => {
    test("create from string", () => {
        const sut = new PostBackData("action=done&timestamp=2021-11-13T06:45:00+09:00Z&kind=BreakfirstMedicine");
        
        expect(sut.action).toBe("done");
        expect(sut.remindedAt.value.diff(dayjs('2021-11-13 06:45:00.000'))).toEqual(0);
        expect(sut.kind).toBe(Kind.BreakfirstMedicine);
    });
});
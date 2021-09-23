import { RemindTiming } from "./domain";
import dayjs = require("dayjs");
import * as timezone from 'dayjs/plugin/timezone'

dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');

test('isRemindTiming -> true', () => {
    const now = dayjs('2021-09-22 06:45:00.000');
    const sut = new RemindTiming([1,2,3,4,5,6,7], 6, 45);

    expect(sut.isRemindTiming(now)).toBe(true);
});
import { Reminder } from "./function";
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone'

dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');

const linebot = {
    send: jest.fn((message) => undefined)
};

beforeEach(() => {
    linebot.send.mockClear();
});

test('confirm send message', () => {
    const reminder = new Reminder(linebot);
    
    const now = dayjs('2021-09-22 06:45:00.000');
    reminder.remind(now)
    expect(linebot.send).toHaveBeenCalledTimes(1);
});

test('confirm not send message', () => {
    const reminder = new Reminder(linebot);
    
    const now = dayjs('2021-09-22 07:45:00.000');
    reminder.remind(now)
    expect(linebot.send).toHaveBeenCalledTimes(0);
});
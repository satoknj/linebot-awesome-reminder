import { Reminder } from "./function";
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone'

dayjs.extend(timezone);
dayjs.tz.setDefault('GMT');

const linebot = {
    send: jest.fn((message) => undefined)
};

beforeEach(() => {
    linebot.send.mockClear();
});

test('confirm send message', () => {
    const reminder = new Reminder(linebot);
    
    const now = dayjs('2021-09-23T21:45:23.000Z'); // azure では　UTC で実行されるため、それをテスト
    reminder.remind(now)
    expect(linebot.send).toHaveBeenCalledTimes(1);
});

test('confirm not send message', () => {
    const reminder = new Reminder(linebot);
    
    const now = dayjs('2021-09-23T22:45:23.000Z'); // azure では　UTC で実行されるため、それをテスト
    reminder.remind(now)
    expect(linebot.send).toHaveBeenCalledTimes(0);
});
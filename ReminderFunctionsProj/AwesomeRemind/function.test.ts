import { Reminder } from "./function";
import * as dayjs from 'dayjs';

const linebot = {
    send: jest.fn((message) => undefined)
};

beforeEach(() => {
    linebot.send.mockClear();
});

test('confirm send message', () => {
    const reminder = new Reminder(linebot);
    
    const now = dayjs('2021-09-23 06:45:23.000');
    reminder.remind(now)
    expect(linebot.send).toHaveBeenCalledTimes(1);
});

test('confirm not send message', () => {
    const reminder = new Reminder(linebot);
    
    const now = dayjs('2021-09-23 07:45:23.000');
    reminder.remind(now)
    expect(linebot.send).toHaveBeenCalledTimes(0);
});
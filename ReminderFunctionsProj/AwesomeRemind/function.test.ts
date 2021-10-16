import { Reminder } from "./function";
import * as dayjs from 'dayjs';

const linebot = {
    send: jest.fn((message) => undefined)
};
const sentMessageRepository = {
    save: jest.fn((sentMessage) => undefined)
}

beforeEach(() => {
    linebot.send.mockClear();
    sentMessageRepository.save.mockClear();
});

test('confirm send message', () => {
    const reminder = new Reminder(linebot, sentMessageRepository);
    
    const now = dayjs('2021-09-23 06:45:23.000');
    reminder.remind(now)
    expect(linebot.send).toHaveBeenCalledTimes(1);
    expect(sentMessageRepository.save).toHaveBeenCalledTimes(1);
});

test('confirm not send message', () => {
    const reminder = new Reminder(linebot, sentMessageRepository);
    
    const now = dayjs('2021-09-23 07:45:23.000');
    reminder.remind(now)
    expect(linebot.send).toHaveBeenCalledTimes(0);
    expect(sentMessageRepository.save).toHaveBeenCalledTimes(0);
});
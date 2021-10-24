import { Reminder } from "./function";
import * as dayjs from 'dayjs';

const linebot = {
    send: jest.fn((message) => undefined)
};
const sentMessageRepository = {
    find: jest.fn((sentMessage) => undefined),
    create: jest.fn((sentMessage) => undefined),
    updateReply: jest.fn((sentMessage) => undefined)
}

beforeEach(() => {
    linebot.send.mockClear();
    sentMessageRepository.create.mockClear();
});

test('confirm send message', () => {
    const reminder = new Reminder(linebot, sentMessageRepository);
    
    const now = dayjs('2021-09-23 06:45:23.000');
    reminder.remind(now)
    expect(linebot.send).toHaveBeenCalledTimes(1);
    expect(sentMessageRepository.create).toHaveBeenCalledTimes(1);
});

test('confirm not send message', () => {
    const reminder = new Reminder(linebot, sentMessageRepository);
    
    const now = dayjs('2021-09-23 07:45:23.000');
    reminder.remind(now)
    expect(linebot.send).toHaveBeenCalledTimes(0);
    expect(sentMessageRepository.create).toHaveBeenCalledTimes(0);
});
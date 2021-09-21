import { Reminder } from "./function";

const linebot = {
    send: jest.fn((message) => undefined)
};

beforeEach(() => {
    linebot.send.mockClear();
});

test('confirm send message', () => {
    const reminder = new Reminder(linebot);
    
    reminder.remind(new Date())
    expect(linebot.send).toHaveBeenCalledTimes(1);
});
import dayjs = require("dayjs");

describe('dayjs format', () => {
    test('test', () => {
        const format = 'YYYY-MM-DDTHH:mm:ssZ[Z]';
        const sut = dayjs('2021-09-23 06:45:23.000');
        
        expect(sut.format(format)).toBe('2021-09-23T06:45:23+09:00Z');
    });
});
import * as assert from 'assert';

const testSyncFunc = (valid: boolean) => {
    if (valid) {
        return 1;
    } else {
        throw new Error('invalid');
    }
};

describe('test sync func', () => {
    test('valid', () => {
        expect(testSyncFunc(true)).toBe(1);
    });
    test('invalid', () => {
        expect(() => testSyncFunc(false)).toThrow('invalid');
    });
});

const testAsyncFunc = async (valid: boolean) => {
    if (valid) {
        return 1;
    } else {
        throw new Error('invalid');
    }
};

describe('test async func', () => {
    test('valid', async () => {
        expect(await testAsyncFunc(true)).toBe(1);
    });
    test('invalid', async () => {
        const promise = testAsyncFunc(false);
        // reject されてる
        expect(promise).rejects.toThrow('invalid');
    });
});

const asynUndefinableFunc = async (valid: boolean) => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (valid) {
                resolve(1);
            } else {
                resolve(undefined);
            }
        }, 100);
    });
};
/*
    *  asyncUndefinableFunc が失敗するわけではないので、awat/catch はできない。
    *  問題の件は constructor で container が有効か確認できればそれがいいのでは？
 */
const asynUndefinableFuncWrapper = async (valid: boolean) => {
    const result = await asynUndefinableFunc(valid);
    assert(result !== undefined, 'assertion error');
    return result.toString();
}

describe('test return promise func', () => {
    test('valid', async () => {
        expect(await asynUndefinableFuncWrapper(true)).toBe("1");
    });
    test.skip('invalid', async () => {
        // このテストケースは不毛。根本のところで解消した方が良い（assert error になる原因を潰す）
        expect(await asynUndefinableFuncWrapper(false)).toThrowError();
    });
});

import test from 'ava';

import { createOk, createErr } from 'option-t/PlainResult/Result';
import { orElseAsyncForResult } from 'option-t/PlainResult/orElseAsync';

const VALUE_T = Math.random();
const ERROR_E = new Error('e');
const ERROR_F = new Error('f');

test('input is Ok(T)', async (t) => {
    t.plan(2);

    const input = createOk(VALUE_T);
    const result = orElseAsyncForResult(input, async (_) => {
        t.pass(false);
        return createOk(_);
    });

    t.true(result instanceof Promise, 'result should be Promise');

    const actual = await result;
    t.is(actual, input);
});

test('input is Err(E), callback return Ok(T)', async (t) => {
    t.plan(3);

    const input = createErr(ERROR_E);
    const expected = createOk(VALUE_T);

    const result = orElseAsyncForResult(input, async (e) => {
        t.is(e, ERROR_E);
        return expected;
    });

    t.true(result instanceof Promise, 'result should be Promise');

    const actual = await result;
    t.is(actual, expected);
});

test('input is Err(E), callback return Err(F)', async (t) => {
    t.plan(3);

    const input = createErr(ERROR_E);
    const expected = createErr(ERROR_F);

    const result = orElseAsyncForResult(input, async (e) => {
        t.is(e, ERROR_E);
        return expected;
    });

    t.true(result instanceof Promise, 'result should be Promise');

    const actual = await result;
    t.is(actual, expected);
});

test('callback should return Promise', async (t) => {
    t.plan(2);

    await t.throwsAsync(
        async () => {
            const input = createErr(ERROR_E);
            await orElseAsyncForResult(input, () => {
                t.pass();
                return 1;
            });
        },
        {
            instanceOf: TypeError,
            message: '`recoverer` must return Promise',
        }
    );
});

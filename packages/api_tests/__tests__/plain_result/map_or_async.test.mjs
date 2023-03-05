import test from 'ava';

import { createOk, createErr } from 'option-t/PlainResult/Result';

import { mapOrAsyncForResult } from 'option-t/PlainResult/mapOrAsync';

test('Ok<T>', async (t) => {
    const INITIAL = `Initial: ${String(Math.random())}`;
    const NOT_EXPECTED = `Not Expected: ${String(Math.random())}`;
    const EXPECTED = `Expected: ${String(Math.random())}`;

    t.plan(3);

    const input = createOk(INITIAL);
    const result = mapOrAsyncForResult(input, NOT_EXPECTED, async (v) => {
        t.is(v, INITIAL, 'the argument');
        return EXPECTED;
    });

    t.true(result instanceof Promise, 'result should be Promise');

    const actual = await result;
    t.is(actual, EXPECTED, 'the return value');
});

test('Err<E>', async (t) => {
    const INITIAL = `Initial: ${String(Math.random())}`;
    const EXPECTED = `Expected: ${String(Math.random())}`;

    t.plan(2);

    const input = createErr(INITIAL);
    const result = mapOrAsyncForResult(input, EXPECTED, async (_v) => {
        t.fail(`don't enter this path`);
    });

    t.true(result instanceof Promise, 'result should be Promise');

    const actual = await result;
    t.is(actual, EXPECTED, 'the return value');
});

test('callback should return Promise', async (t) => {
    t.plan(2);

    await t.throwsAsync(
        async () => {
            const input = createOk(Math.random());
            await mapOrAsyncForResult(input, 0, () => {
                t.pass();
                return Math.random();
            });
        },
        {
            instanceOf: TypeError,
            message: '`transformer` must return Promise',
        }
    );
});

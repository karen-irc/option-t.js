import test from 'ava';

import { createOk, createErr } from 'option-t/PlainResult/Result';
import { unwrapOrElseAsyncForResult } from 'option-t/PlainResult/unwrapOrElseAsync';

const VALUE_T = Math.random();
const DEFAULT_VAL = Math.random();
const ERROR_E = new Error();

test('input is Ok(T)', async (t) => {
    t.plan(2);

    const input = createOk(VALUE_T);
    const result = unwrapOrElseAsyncForResult(input, async () => {
        t.pass(true);
        return DEFAULT_VAL;
    });

    t.true(result instanceof Promise, 'result should be Promise');

    const actual = await result;
    t.is(actual, VALUE_T);
});

test('input is Err(E)', async (t) => {
    t.plan(3);

    const input = createErr(ERROR_E);
    const result = unwrapOrElseAsyncForResult(input, async () => {
        t.pass(true);
        return DEFAULT_VAL;
    });

    t.true(result instanceof Promise, 'result should be Promise');

    const actual = await result;
    t.is(actual, DEFAULT_VAL);
});

import test from 'ava';

import { createOk, createErr } from 'option-t/PlainResult/Result';

import { mapOrForResult } from 'option-t/PlainResult/mapOr';

test('Ok<T>', (t) => {
    const INITIAL = 1;
    const NOT_EXPECTED = 2;
    const EXPECTED = 3;

    t.plan(2);

    const input = createOk(INITIAL);
    const r = mapOrForResult(input, NOT_EXPECTED, (v) => {
        t.is(v, INITIAL, 'the argument');
        return EXPECTED;
    });

    t.is(r, EXPECTED, 'the return value');
});

test('Err<E>', (t) => {
    const INITIAL = 1;
    const EXPECTED = 3;

    t.plan(1);

    const input = createErr(INITIAL);
    const r = mapOrForResult(input, EXPECTED, (_v) => {
        t.fail(`don't enter this path`);
    });

    t.is(r, EXPECTED, 'the return value');
});

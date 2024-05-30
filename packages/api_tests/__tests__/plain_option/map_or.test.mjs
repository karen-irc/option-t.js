import test from 'ava';

import { createSome, createNone } from 'option-t/plain_option/option';
import { mapOrForOption } from 'option-t/plain_option/map_or';

const VALUE_T = Math.random();
const VALUE_U = Math.random();
const DEFAULT_VAL = Math.random();

test('input is Some(T)', (t) => {
    t.plan(2);

    const input = createSome(VALUE_T);
    const actual = mapOrForOption(input, DEFAULT_VAL, (v) => {
        t.pass(v, VALUE_T);
        return VALUE_U;
    });

    t.is(actual, VALUE_U);
});

test('input is None', (t) => {
    t.plan(1);

    const input = createNone();
    const actual = mapOrForOption(input, DEFAULT_VAL, (v) => {
        t.pass(v, VALUE_T);
        return VALUE_U;
    });

    t.is(actual, DEFAULT_VAL);
});

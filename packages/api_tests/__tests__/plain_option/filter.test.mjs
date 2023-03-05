import test from 'ava';

import { createSome, createNone } from 'option-t/PlainOption/Option';
import { filterForOption } from 'option-t/PlainOption/filter';

test('input is Some, and predicate return true', (t) => {
    const expected = Symbol('input');
    const input = createSome(expected);
    const actual = filterForOption(input, (_inner) => true);

    t.true(actual.ok, 'should be Some');
    t.is(actual.val, expected, 'should be expected');
});

test('input is Some, and predicate return false', (t) => {
    const INNER_VAL = Symbol('input');
    const input = createSome(INNER_VAL);
    const actual = filterForOption(input, (_inner) => false);
    t.false(actual.ok, 'should be None');
});

test('input is None', (t) => {
    const input = createNone();
    const actual = filterForOption(input);

    t.false(actual.ok, 'should be None');
});

import test from 'ava';

import { createSome, createNone } from 'option-t/PlainOption/Option';
import { orForOption } from 'option-t/PlainOption/or';

test('a=Some, b=Some', (t) => {
    const EXPECTED = Symbol('expected');
    const NOT_EXPECTED = Symbol('not expected');

    const a = createSome(EXPECTED);
    const b = createSome(NOT_EXPECTED);

    const actual = orForOption(a, b);

    t.is(actual, a, 'should return a');
    t.true(actual.ok, 'should be Some');
    t.is(actual.val, EXPECTED, 'should be the inner value');
});

test('a=Some, b=None', (t) => {
    const EXPECTED = Symbol('expected');

    const a = createSome(EXPECTED);
    const b = createNone();

    const actual = orForOption(a, b);

    t.is(actual, a, 'should return a');
    t.true(actual.ok, 'should be Some');
    t.is(actual.val, EXPECTED, 'should be the inner value');
});

test('a=None, b=Some', (t) => {
    const EXPECTED = Symbol('expected');

    const a = createNone();
    const b = createSome(EXPECTED);

    const actual = orForOption(a, b);

    t.is(actual, b, 'should return b');
    t.true(actual.ok, 'should be Some');
    t.is(actual.val, EXPECTED, 'should be the inner value');
});

test('a=None, b=None', (t) => {
    const a = createNone();
    const b = createNone();

    const actual = orForOption(a, b);

    t.is(actual, b, 'should return b');
    t.false(actual.ok, 'should be None');
});

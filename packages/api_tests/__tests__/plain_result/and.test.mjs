import test from 'ava';

import { createOk, createErr } from 'option-t/PlainResult/Result';
import { andForResult } from 'option-t/PlainResult/and';

test('a=Ok, b=Ok', (t) => {
    const EXPECTED = Symbol('expected');
    const NOT_EXPECTED = Symbol('not expected');

    const a = createOk(NOT_EXPECTED);
    const b = createOk(EXPECTED);

    const actual = andForResult(a, b);

    t.is(actual, b, 'should return b');
    t.true(actual.ok, 'should be Ok');
    t.is(actual.val, EXPECTED, 'should be the inner value');
});

test('a=Ok, b=Err', (t) => {
    const EXPECTED = Symbol('expected');
    const NOT_EXPECTED = Symbol('not expected');

    const a = createOk(NOT_EXPECTED);
    const b = createErr(EXPECTED);

    const actual = andForResult(a, b);

    t.is(actual, b, 'should return b');
    t.false(actual.ok, 'should be Err');
    t.is(actual.err, EXPECTED, 'should be the inner value');
});

test('a=Err, b=Ok', (t) => {
    const EXPECTED = Symbol('expected');
    const NOT_EXPECTED = Symbol('not expected');

    const a = createErr(EXPECTED);
    const b = createOk(NOT_EXPECTED);

    const actual = andForResult(a, b);

    t.is(actual, a, 'should return a');
    t.false(actual.ok, 'should be Err');
    t.is(actual.err, EXPECTED, 'should be the inner value');
});

test('a=Err, b=Err', (t) => {
    const EXPECTED = Symbol('expected');
    const NOT_EXPECTED = Symbol('not expected');

    const a = createErr(EXPECTED);
    const b = createErr(NOT_EXPECTED);

    const actual = andForResult(a, b);

    t.is(actual, a, 'should return a');
    t.false(actual.ok, 'should be Err');
    t.is(actual.err, EXPECTED, 'should be the inner value');
});

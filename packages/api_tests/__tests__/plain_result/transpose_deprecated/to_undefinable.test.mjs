import test from 'ava';

import { createOk, createErr, isOk, isErr } from 'option-t/PlainResult/Result';
import { transposeUndefinableForResult } from 'option-t/PlainResult/transpose';

test('input is Ok<T>, the result should be Ok(T)', (t) => {
    const val = Symbol('val');
    const input = createOk(val);
    const actual = transposeUndefinableForResult(input);
    t.true(isOk(actual), 'the inner should Ok<T>');
    t.is(actual.val, val, "the inner's inner should T");
});

test('input is Ok<null>, the result should be undefined', (t) => {
    const input = createOk(undefined);
    const actual = transposeUndefinableForResult(input);
    t.is(actual, undefined);
});

test('input is Err<E>, the result should be Err(e)', (t) => {
    const inner = Symbol('err');
    const input = createErr(inner);
    const actual = transposeUndefinableForResult(input);

    t.true(isErr(actual), 'the actual should Err<E>');
    t.is(actual.err, inner, "the actual's inner should E");
});

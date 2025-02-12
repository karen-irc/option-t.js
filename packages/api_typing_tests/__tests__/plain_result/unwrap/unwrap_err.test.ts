import test from 'ava';

import { expectTypeOf } from 'expect-type';
import { createOk, createErr, unwrapErr } from 'option-t/plain_result/result';

test('input=Ok(T), unwrap=Err(E)', (t) => {
    t.pass('this is type test');

    const input = createOk(1);
    const actual = unwrapErr(input);
    expectTypeOf(actual).toBeNever();
});

test('input=Err(E), unwrap=Err(E)', (t) => {
    t.pass('this is type test');

    const input = createErr(1);
    const actual = unwrapErr(input);
    expectTypeOf(actual).toBeNumber();
});

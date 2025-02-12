import test from 'ava';
import { expectTypeOf } from 'expect-type';

import { createOk, createErr, unwrapOk } from 'option-t/plain_result/result';

test('input=Ok(T), unwrap=Ok(T)', (t) => {
    t.pass('this is type test');

    const input = createOk(1);
    const actual = unwrapOk(input);
    expectTypeOf(actual).toBeNumber();
});

test('input=Err(E), unwrap=Ok(T)', (t) => {
    t.pass('this is type test');

    const input = createErr(1);
    const actual = unwrapOk(input);
    expectTypeOf(actual).toBeNever();
});

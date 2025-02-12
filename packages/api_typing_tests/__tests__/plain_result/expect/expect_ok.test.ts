import test from 'ava';
import { expectTypeOf } from 'expect-type';

import { createOk, createErr, expectOk } from 'option-t/plain_result/result';

test('input=Ok(T), expect=Ok(T)', (t) => {
    t.pass('this is type test');

    const input = createOk(1);
    const actual = expectOk(input, '');
    expectTypeOf(actual).toBeNumber();
});

test('input=Err(E), expect=Ok(T)', (t) => {
    t.pass('this is type test');

    const input = createErr(1);
    const actual = expectOk(input, '');
    expectTypeOf(actual).toBeNever();
});

import test from 'ava';

import { expectTypeOf } from 'expect-type';
import { createOk, createErr, expectErr } from 'option-t/plain_result/result';

test('input=Ok(T), expect=Err(E)', (t) => {
    t.pass('this is type test');

    const input = createOk(1);
    const actual = expectErr(input, '');
    expectTypeOf(actual).toBeNever();
});

test('input=Err(E), expect=Err(E)', (t) => {
    t.pass('this is type test');

    const input = createErr(1);
    const actual = expectErr(input, '');
    expectTypeOf(actual).toBeNumber();
});

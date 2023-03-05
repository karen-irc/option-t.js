import test from 'ava';

import { createErr, createOk } from 'option-t/PlainResult/Result';
import { inspectErrOfResult } from 'option-t/PlainResult/inspect';

test('input is Ok()', (t) => {
    t.plan(1);
    const INPUT_INNER = Symbol('input');

    const input = createOk(INPUT_INNER);
    const actual = inspectErrOfResult(input, (_v) => {
        t.pass('should not call the inspect fn');
    });
    t.is(input, actual, 'should be the expect returned');
});

test('input is Err()', (t) => {
    t.plan(3);
    const INPUT_INNER = Symbol('input');

    const input = createErr(INPUT_INNER);
    const actual = inspectErrOfResult(input, (v) => {
        t.pass('should call the inspect fn');
        t.is(v, INPUT_INNER, 'should be the expected arg');
    });

    t.is(input, actual, 'should be the expect returned');
});

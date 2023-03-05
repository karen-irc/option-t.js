import test from 'ava';

import { createClassicOk, createClassicErr } from 'option-t/esm/ClassicResult';

const EXPECTED_OK = Symbol('expected_ok');
const EXPECTED_ERR = Symbol('expected_err');

test('Ok<T>', (t) => {
    t.plan(4);

    let args = null;

    function okDestructor(v) {
        args = v;
        t.pass('call okDestructor');
    }
    function errDestructor(e) {
        args = e;
        t.fail('call errDestructor');
    }

    const result = createClassicOk(EXPECTED_OK);
    result.drop(okDestructor, errDestructor);

    t.is(args, EXPECTED_OK, 'should be called with the expected');
    t.true(Object.isFrozen(result), 'should be freezed');
    t.is(result.unwrap(), null, 'should be freed');
});

test('Err<E>', (t) => {
    t.plan(4);

    let args = null;

    function okDestructor(v) {
        args = v;
        t.fail('call okDestructor');
    }
    function errDestructor(e) {
        args = e;
        t.pass('call errDestructor');
    }

    const result = createClassicErr(EXPECTED_ERR);
    result.drop(okDestructor, errDestructor);

    t.is(args, EXPECTED_ERR, 'should be called with the expected');
    t.true(Object.isFrozen(result), 'should be freezed');
    t.is(result.unwrapErr(), null, 'should be freed');
});

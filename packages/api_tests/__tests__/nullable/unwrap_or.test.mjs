import test from 'ava';

import { unwrapOrFromNullable } from 'option-t/Nullable/unwrapOr';
import { nonNullableValueCaseListForSync } from '../utils.mjs';

const NULL_VALUE_IN_THIS_TEST_CASE = null;
const NULLY_VALUE_BUT_NOT_NULL_VALUE_IN_THIS_TEST_CASE = undefined;

for (const [INPUT, , EXPECTED] of nonNullableValueCaseListForSync) {
    test('pass the value: ' + String(INPUT), (t) => {
        const DEFAULT_VAL = Math.random();
        const result = unwrapOrFromNullable(INPUT, DEFAULT_VAL);
        t.is(result, EXPECTED);
    });
}

test(`pass ${NULL_VALUE_IN_THIS_TEST_CASE}`, (t) => {
    const DEFAULT_VAL = Math.random();
    const result = unwrapOrFromNullable(NULL_VALUE_IN_THIS_TEST_CASE, DEFAULT_VAL);

    t.is(result, DEFAULT_VAL);
});

test(`pass ${NULLY_VALUE_BUT_NOT_NULL_VALUE_IN_THIS_TEST_CASE}`, (t) => {
    const DEFAULT_VAL = Math.random();
    const result = unwrapOrFromNullable(
        NULLY_VALUE_BUT_NOT_NULL_VALUE_IN_THIS_TEST_CASE,
        DEFAULT_VAL
    );

    t.is(result, NULLY_VALUE_BUT_NOT_NULL_VALUE_IN_THIS_TEST_CASE);
});

const testcases = [[NULL_VALUE_IN_THIS_TEST_CASE, NULL_VALUE_IN_THIS_TEST_CASE]];
for (const [src, def] of testcases) {
    test(`should not accept null for both, v = ${String(src)}, def = ${String(def)}`, (t) => {
        t.plan(1);

        t.throws(
            () => {
                unwrapOrFromNullable(src, def);
            },
            { instanceOf: TypeError, message: '`defaultValue` must not be `null`' }
        );
    });
}

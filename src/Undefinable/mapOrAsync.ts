import { assertIsPromise } from '../internal/assert';
import { ERR_MSG_TRANSFORMER_MUST_RETURN_PROMISE } from '../internal/ErrorMessage';
import type { AsyncTransformFn } from '../internal/Function';

import { Undefinable, isUndefined } from './Undefinable';
import {
    ERR_MSG_TRANSFORMER_MUST_NOT_RETURN_NO_VAL_FOR_UNDEFINABLE,
    ERR_MSG_DEFAULT_VALUE_MUST_NOT_BE_NO_VAL_FOR_UNDEFINABLE,
} from './ErrorMessage';
import { expectNotUndefined } from './expect';

export type { AsyncTransformFn };

function check<T>(value: Undefinable<T>): T {
    const passed = expectNotUndefined(
        value,
        ERR_MSG_TRANSFORMER_MUST_NOT_RETURN_NO_VAL_FOR_UNDEFINABLE
    );
    return passed;
}

/**
 *  Return the result of _transformer_ with using _input_ as an argument for it if _input_ is not `undefined`.
 *  Otherwise, return _defaultValue_.
 *
 *  Basically, this operation is a combination `map()` and `unwrapOr()`.
 *
 *  * `U` must not be `Undefinable<*>`.
 *      * If the result of _transformer_ is `undefined`, this throw an `Error`.
 *      * If the result of _defaultValue_ is `undefined`, this throw an `Error`.
 *  * If you'd like to accept `Undefinable<*>` as `U`, use a combination `andThen()` and `or()`.
 */
export function mapOrAsyncForUndefinable<T, U>(
    input: Undefinable<T>,
    defaultValue: U,
    transformer: AsyncTransformFn<T, U>
): Promise<U> {
    if (isUndefined(input)) {
        const nonNullDefault = expectNotUndefined(
            defaultValue,
            ERR_MSG_DEFAULT_VALUE_MUST_NOT_BE_NO_VAL_FOR_UNDEFINABLE
        );
        return Promise.resolve(nonNullDefault);
    }

    const result: Promise<U> = transformer(input);
    // If this is async function, this always return Promise, but not.
    // We should check to clarify the error case if user call this function from plain js
    // and they mistake to use this.
    assertIsPromise(result, ERR_MSG_TRANSFORMER_MUST_RETURN_PROMISE);

    const passed: Promise<U> = result.then(check);
    return passed;
}

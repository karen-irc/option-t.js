import { assertIsPromise } from '../internal/assert.js';
import { ERR_MSG_TRANSFORMER_MUST_RETURN_PROMISE } from '../internal/error_message.js';
import type { AsyncTransformFn } from '../internal/function.js';
import { type Result, isErr, unwrapOk } from './result.js';

export type ResultAsyncTryTransformFn<in T, out U, out E> = AsyncTransformFn<T, Result<U, E>>;

/**
 *  Returns `Promise<Err(E)>` if the _input_ is `Err(E)`,
 *  otherwise calls _transformer_ with the value and returns the result.
 *
 *  XXX:
 *  Some languages call this operation flatmap.
 *  But we don't provide `flatMap()` as alias of this function
 *  to sort with other APIs.
 */
export function andThenAsyncForResult<T, U, E>(
    input: Result<T, E>,
    transformer: ResultAsyncTryTransformFn<T, U, E>
): Promise<Result<U, E>> {
    if (isErr(input)) {
        return Promise.resolve(input);
    }

    const source: T = unwrapOk(input);
    const result: Promise<Result<U, E>> = transformer(source);
    // If this is async function, this always return Promise, but not.
    // We should check to clarify the error case if user call this function from plain js
    // and they mistake to use this.
    assertIsPromise(result, ERR_MSG_TRANSFORMER_MUST_RETURN_PROMISE);
    return result;
}

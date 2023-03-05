import { type Maybe, isNotNullOrUndefined } from './maybe.js';
import { type Result, createErr, createOk } from '../PlainResult/result.js';
import type { RecoveryFn } from '../internal/function.js';

/**
 * Transforms the `Maybe<T>` into a `Result<T, E>` by mapping `T` to `Ok(T)`.
 * If `input` is `undefined` or `null`, then returns `Err(E)` with the result of `recoverer()`
 */
export function okOrElseForMaybe<T, E>(input: Maybe<T>, recoverer: RecoveryFn<E>): Result<T, E> {
    if (isNotNullOrUndefined(input)) {
        const v = createOk<T>(input);
        return v;
    }

    const e: E = recoverer();
    const v = createErr<E>(e);
    return v;
}

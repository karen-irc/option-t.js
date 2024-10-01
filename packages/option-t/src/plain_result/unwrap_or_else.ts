import type { RecoveryFromErrorFn } from '../internal/function.js';
import { isOk, type Result } from './result.js';

/**
 *  Unwraps a result _input_, returns the content of an `Ok(T)`.
 *  If the value is an `Err(E)` then it calls `def` with its value.
 */
export function unwrapOrElseForResult<T, E>(
    input: Result<T, E>,
    recoverer: RecoveryFromErrorFn<E, T>,
): T {
    if (isOk(input)) {
        const val: T = input.val;
        return val;
    }

    const fallback: T = recoverer(input.val);
    return fallback;
}

import { RecoveryFromErrorFn } from '../internal/Function';
import { Result } from './Result';

export type { RecoveryFromErrorFn };

/**
 *  Unwraps a result _input_, returns the content of an `Ok(T)`.
 *  If the value is an `Err(E)` then it calls `def` with its value.
 */
export function unwrapOrElseFromResult<T, E>(
    input: Result<T, E>,
    recoverer: RecoveryFromErrorFn<E, T>
): T {
    if (input.ok) {
        const val: T = input.val;
        return val;
    }

    const fallback: T = recoverer(input.err);
    return fallback;
}

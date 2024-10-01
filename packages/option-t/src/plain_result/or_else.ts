import type { RecoveryFromErrorFn } from '../internal/function.js';
import { isOk, type Result } from './result.js';

export type ResultTryRecoveryFromErrorFn<in E, out T, out F> = RecoveryFromErrorFn<E, Result<T, F>>;

/**
 *  Calls _recoverer_ and return its returned value if _input_ is `Err(E)`,
 *  otherwise returns _input_ as `Ok(T)`.
 *  This function can be used for control flow based on result values.
 */
export function orElseForResult<T, E, F>(
    input: Result<T, E>,
    recoverer: ResultTryRecoveryFromErrorFn<E, T, F>,
): Result<T, F> {
    if (isOk(input)) {
        return input;
    }

    const fallback = recoverer(input.val);
    return fallback;
}

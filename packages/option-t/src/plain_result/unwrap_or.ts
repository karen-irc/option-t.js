import { isOk, type Result } from './result.js';

/**
 *  Unwraps a result _input_, returns the content of an `Ok(T)`.
 *  If the value is an `Err(E)` then return _defaultValue_.
 */
export function unwrapOrForResult<T>(input: Result<T, unknown>, defaultValue: T): T {
    if (isOk(input)) {
        const val: T = input.val;
        return val;
    }

    return defaultValue;
}

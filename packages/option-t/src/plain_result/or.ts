import { isOk, type Result } from './result.js';

/**
 *  Return _a_ if _a_ is `Ok(T)`.
 *  Otherwise, return _b_.
 */
export function orForResult<T, E, F>(a: Result<T, E>, b: Result<T, F>): Result<T, F> {
    if (isOk(a)) {
        return a;
    }

    return b;
}

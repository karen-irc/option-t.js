import type { Result } from '../plain_result/result.js';
import { type Option, createNone, createSome } from './option.js';

/**
 *  Convert to `Some(T)` if _input_ is `Ok(T)`.
 *  Otherwise, return `None`.
 */
export function fromOkToOption<T, E>(input: Result<T, E>): Option<T> {
    if (input.ok) {
        return createSome<T>(input.val);
    }

    return createNone();
}

/**
 *  Convert to `Some(E)` if _input_ is `Err(E)`.
 *  Otherwise, return `None`.
 */
export function fromErrToOption<T, E>(input: Result<T, E>): Option<E> {
    if (!input.ok) {
        return createSome<E>(input.err);
    }

    return createNone();
}

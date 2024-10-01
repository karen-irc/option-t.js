import {
    type Result,
    createOk,
    createErr,
    type Ok,
    type Err,
    isErr,
} from '../plain_result/result.js';
import { type Option, isNone, createSome, createNone, type None, type Some } from './option.js';

/**
 *  Transposes an `Option` of a `Result` into a `Result` of an `Option`.
 *
 *  - `Some(Ok(x))` -> `Ok(Some(x))`
 *  - `Some(Err(e))` -> `Err(e)`
 *  - `None` => `Ok(None)`
 */
export function transposeOptionToResult<T, E>(input: Option<Result<T, E>>): Result<Option<T>, E> {
    if (isNone(input)) {
        const inner: None = createNone();
        const result: Ok<None> = createOk(inner);
        return result;
    }

    const inner: Result<T, E> = input.val;
    if (isErr(inner)) {
        const err: E = inner.val;
        const result: Err<E> = createErr(err);
        return result;
    }

    const innerInner: T = inner.val;
    const some: Some<T> = createSome(innerInner);
    const result: Ok<Some<T>> = createOk(some);
    return result;
}

/**
 *  Transposes a `Result` of an `Option` into an `Option` of a `Result`.
 *
 *  - `Ok(Some(v))` -> `Some(Ok(v))`
 *  - `Ok(None)` -> `None`
 *  - `Err(e)` -> `Some(Err(e))`
 */
export function transposeResultToOption<T, E>(input: Result<Option<T>, E>): Option<Result<T, E>> {
    if (isErr(input)) {
        const err: E = input.val;
        const newErr: Err<E> = createErr(err);
        const result: Some<Err<E>> = createSome<Err<E>>(newErr);
        return result;
    }

    const inner: Option<T> = input.val;
    if (isNone(inner)) {
        const result = createNone();
        return result;
    }

    const innerInner: T = inner.val;
    const innerV: Ok<T> = createOk(innerInner);
    const result: Option<Ok<T>> = createSome(innerV);
    return result;
}

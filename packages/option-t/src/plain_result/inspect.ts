import type { EffectFn } from '../internal/function.js';
import { isErr, isOk, type Result } from './result.js';

/**
 *  * Return _input_ directly.
 *      * This value is passed as the input. But it maybe mutated by calling _effector_.
 *  * Call _effector_ with the inner value of _input_ if _input_ is `Ok(T)`.
 *  * This main purpose is to inspect an inner value in a chained function calling.
 *    If you don't have to do it, you should not mutate the inner value.
 *    if-else statement might be sufficient to mutate the inner value instead of calling this function.
 */
export function inspectOkForResult<T, E>(input: Result<T, E>, effector: EffectFn<T>): Result<T, E> {
    if (isOk(input)) {
        effector(input.val);
    }
    return input;
}

/**
 *  * Return _input_ directly.
 *      * This value is passed as the input. But it maybe mutated by calling _effector_.
 *  * Call _effector_ with the inner value of _input_ if _input_ is `Err(E)`.
 *  * This main purpose is to inspect an inner value in a chained function calling.
 *    If you don't have to do it, you should not mutate the inner value.
 *    if-else statement might be sufficient to mutate the inner value instead of calling this function.
 */
export function inspectErrForResult<T, E>(
    input: Result<T, E>,
    effector: EffectFn<E>,
): Result<T, E> {
    if (isErr(input)) {
        effector(input.val);
    }
    return input;
}

/**
 *  * Return _input_ directly.
 *      * This value is passed as the input. But it maybe mutated by calling _effector_.
 *  * Call _okEffector_ with the inner value of _input_ if _input_ is `Ok(T)`.
 *    Otherwise, call _errEffector_ with the inner value if _input_ is `Err(E)`
 *  * This main purpose is to inspect an inner value in a chained function calling.
 *    If you don't have to do it, you should not mutate the inner value.
 *    if-else statement might be sufficient to mutate the inner value instead of calling this function.
 */
export function inspectBothForResult<T, E>(
    input: Result<T, E>,
    okEffector: EffectFn<T>,
    errEffector: EffectFn<E>,
): Result<T, E> {
    if (isOk(input)) {
        okEffector(input.val);
    } else {
        errEffector(input.val);
    }
    return input;
}

import type { EffectFn } from '../internal/function.js';
import type { Mutable } from '../internal/mutable.js';
import { asMutResult } from './as_mut.js';
import { type Result, type Ok, type Err, isOk } from './result.js';

export type MutOk<out T> = Mutable<Ok<T>>;
export type MutErr<out E> = Mutable<Err<E>>;
type MutResult<T, E> = MutOk<T> | MutErr<E>;

export type UnsafeOkDestructorFn<in T> = EffectFn<MutOk<T>>;
export type UnsafeErrDestructorFn<in E> = EffectFn<MutErr<E>>;

function noop<T, E>(_input: MutResult<T, E>): void {}

/**
 *  mutators ared called for the inputted _input_.
 *
 *  This function allows you to cut the reference to contain values from _input_.
 *  However, it would be unsafe operation if you do some more operation after this.
 *  For example, you can write the following code.
 *
 *  ```javascript
 *      const ok = createOk(1);
 *      unsafeDropForResult(ok, (ok) => {
 *          ok.ok = false;
 *      }, (err) => {
 *          ok.ok = true;
 *      });
 *      isOk(ok); // -> false. This is dangerous.
 *  ```
 *
 *  Compared to Rust, JavaScript does not have ownership semantics in language
 *  and this API is designed to use as a destructor or similar fashions.
 *  So if you call this for same object more than once, your code might contain "double free" problem.
 *
 *  @throws
 *  This throw an `Error` instance if the _input_ is frozen.
 */
export function unsafeDropBothForResult<T, E>(
    input: Result<T, E>,
    okMutator: UnsafeOkDestructorFn<T>,
    errMutator: UnsafeErrDestructorFn<E>,
): void {
    const mutable: MutResult<T, E> = asMutResult<T, E>(input);
    // @ts-expect-error
    if (isOk(mutable)) {
        okMutator(mutable);
        mutable.val = undefined as never;
    } else {
        errMutator(mutable);
        mutable.val = undefined as never;
    }

    // By this freezing, if this function is called to the _input_ again,
    // then this will throw a mutation error on releasing the value.
    //
    // We can do similar thing with `WeakSet`.
    // But we did not choose it way to avoid a side effect to initialize `WeakSet`.
    Object.freeze(mutable);
}

/**
 *  The _okMutator_ is called if _input_ is `Ok<T>`.
 *
 *  This function allows you to cut the reference to the contain value from _input_.
 *  However, it would be unsafe operation if you do some more operation after this.
 *  For example, you can write the following code.
 *
 *  ```javascript
 *      const ok = createOk(1);
 *      unsafeDropOkForResult(ok, (ok) => {
 *          ok.ok = false;
 *      });
 *      isOk(ok); // -> false. This is dangerous.
 *  ```
 *
 *  Compared to Rust, JavaScript does not have ownership semantics in language
 *  and this API is designed to use as a destructor or similar fashions.
 *  So if you call this for same object more than once, your code might contain "double free" problem.
 *
 *  @throws
 *  This throw an `Error` instance if the _input_ is frozen.
 */
export function unsafeDropOkForResult<T, E>(
    input: Result<T, E>,
    okMutator: UnsafeOkDestructorFn<T>,
): void {
    return unsafeDropBothForResult(input, okMutator, noop);
}

/**
 *  The _errMutator_ is called if _input_ is `Err<E>`.
 *
 *  This function allows you to cut the reference to the contain value from _input_.
 *  However, it would be unsafe operation if you do some more operation after this.
 *  For example, you can write the following code.
 *
 *  ```javascript
 *      const err = createErr('bar');
 *      unsafeDropErrForResult(err, (err) => {
 *          err.ok = true;
 *      });
 *      isErr(err); // -> false. This is dangerous.
 *  ```
 *
 *  Compared to Rust, JavaScript does not have ownership semantics in language
 *  and this API is designed to use as a destructor or similar fashions.
 *  So if you call this for same object more than once, your code might contain "double free" problem.
 *
 *  @throws
 *  This throw an `Error` instance if the _input_ is frozen.
 */
export function unsafeDropErrForResult<T, E>(
    input: Result<T, E>,
    errMutator: UnsafeErrDestructorFn<E>,
): void {
    return unsafeDropBothForResult(input, noop, errMutator);
}

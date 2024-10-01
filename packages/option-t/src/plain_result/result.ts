import {
    ERR_MSG_UNWRAP_ERR_BUT_INPUT_IS_OK,
    ERR_MSG_UNWRAP_OK_BUT_INPUT_IS_ERR,
} from './internal/error_message.js';

/**
 *
 *  This is [_result type_](https://en.wikipedia.org/wiki/Result_type).
 *
 *  ## CAUTION:
 *
 *  ### Be careful to use `===` or `Object.is()` to compare the equality of this type
 *
 *  You should use `equal` operator to check the equality for two objects of this type
 *  instead of `===` or `Object.is()`.
 *  Operators for this type sometimes return the inputted object directly
 *  to avoid an unnecessary objecti allocation.
 *
 *  We use this design by the assumption that we would not compare `a` and `b` usually in the following case.
 *  It usually suggest some design problems if you would like to compare these `a` and `b`.
 *
 *  ```typescript
 *  const a = createOk(val);
 *  const b = andThen(a, someOperation);
 *  ```
 */
export type Result<T, E> = Ok<T> | Err<E>;

const TAG_OK = 'ok' as const;
const TAG_ERR = 'err' as const;

/**
 *  This type contain a success value _T_.
 *
 *  You can create this type value and get an inner value in this type by hand.
 *  But we recommend to use the factory {@link createOk()} and utility functions for forward compatibility.
 *  And we don't recommend to implement this type for your type too.
 *
 *  - {@link createOk()} to create a value of `Ok(T)`.
 *  - {@link isOk()} to check whether the value is `Ok(T)`.
 *  - {@link unwrapOk()} to get an inner value in `Ok(T)`.
 *  - `unwrapOr()` to get either an inner value in `Ok(T)` or a fallback default value.
 *  - ...and more.
 */
export interface Ok<out T> {
    /**
     *  Don't touch this property directly from an user project
     *  except 3rd party project that does not install this package but uses a value returned from an other project.
     *  Instead, use {@link isOk()} or {@link isErr()} operator to get an inner value.
     *
     *  Historically, this type was created to target a JSVM that supports ES5.
     *  Then there was no well optimized `Symbol` to achieve a private property.
     *  We don't have a plan to change this into private property keep the backward compatibility.
     */
    readonly tag: typeof TAG_OK;
    /**
     *  Don't touch this property directly from an user project
     *  except 3rd party project that does not install this package but uses a value returned from an other project.
     *  Instead, use {@link unwrapOk()} operator to get an inner value.
     *
     *  Historically, this type was created to target a JSVM that supports ES5.
     *  Then there was no well optimized `Symbol` to achieve a private property.
     *  We don't have a plan to change this into private property keep the backward compatibility.
     */
    readonly val: T;

    // To keep the same shape (hidden class or structure) with the other.
    // we should initialize this property.
    //
    // As I remembered, when I had introduced this property in early 2018,
    // I tested a shape transition for some engines. By their results,
    // I concluded `Ok` and `Err` should have same properties to make to use the same shape.
    //
    //  - Modern JSVMs in web engines used a single shape.
    //      - Inline cache would be monomorphic.
    //      - I tested JavaScriptCore (for Safari 15.4), SpiderMonkey (for Firefox v99), and V8 9.9.
    //  - Old V8 used an another hidden class if `val` is `number` or others.
    //      - Inline cache for an object taking this type would be polymorphic.
    //      - But we can assume that it will not be megamorphic by the observation.
    //
    // Of course, this decision has some drawbacks for users of this package.
    //
    //  1. If user use `Object.hasOwnProperty` or `for-in` statement fot this object,
    //     this property will be leaked accidentally.
    //     However, we don't think it is a common operation for user because we provide `is~~()` function
    //     and user will not do their operations generally for a "container" object like this type.
    //
    //  2. If user will use `const { ok, err }` = Ok;`, then val will be `null`.
    //     We can say same thing for `Err`.
    //
    // By these reasons, we should not recommend to create this object without this factory function.
    // User can create this object by hand. But it's fragile for the future change. So We should not recommend it.
}

export function isOk<T, E>(input: Result<T, E>): input is Ok<T> {
    const ok = input.tag === TAG_OK;
    return ok;
}

export function createOk<T>(val: T): Ok<T> {
    const r: Ok<T> = {
        tag: TAG_OK,
        val,
    };
    return r;
}

/**
 *  This type contain a failure information _E_.
 *
 *  You can create this type value and get an inner value in this type by hand.
 *  But we recommend to use the factory {@link createErr()} and utility functions for forward compatibility.
 *  And we don't recommend to implement this type for your type too.
 *
 *  - {@link createErr()} to create a value of `Err(E)`.
 *  - {@link isErr()} to check whether the value is `Err(E)`.
 *  - {@link unwrapErr()} to get an inner failure information in `Err(E)`.
 *  - ...and more.
 */
export interface Err<out E> {
    /**
     *  Don't touch this property directly from an user project
     *  except 3rd party project that does not install this package but uses a value returned from an other project.
     *  Instead, use {@link isOk()} or {@link isErr()} operator to get an inner value.
     *
     *  Historically, this type was created to target a JSVM that supports ES5.
     *  Then there was no well optimized `Symbol` to achieve a private property.
     *  We don't have a plan to change this into private property keep the backward compatibility.
     */
    readonly tag: typeof TAG_ERR;

    // To keep the same shape (hidden class or structure) with the other.
    // we should initialize this property.
    //
    // As I remembered, when I had introduced this property in early 2018,
    // I tested a shape transition for some engines. By their results,
    // I concluded `Ok` and `Err` should have same properties to make to use the same shape.
    //
    //  - Modern JSVMs in web engines used a single shape.
    //      - Inline cache would be monomorphic.
    //      - I tested JavaScriptCore (for Safari 15.4), SpiderMonkey (for Firefox v99), and V8 9.9.
    //  - Old V8 used an another hidden class if `val` is `number` or others.
    //      - Inline cache for an object taking this type would be polymorphic.
    //      - But we can assume that it will not be megamorphic by the observation.
    //
    // Of course, this decision has some drawbacks for users of this package.
    //
    //  1. If user use `Object.hasOwnProperty` or `for-in` statement fot this object,
    //     this property will be leaked accidentally.
    //     However, we don't think it is a common operation for user because we provide `is~~()` function
    //     and user will not do their operations generally for a "container" object like this type.
    //
    //  2. If user will use `const { ok, err }` = Ok;`, then val will be `null`.
    //     We can say same thing for `Err`.
    //
    // By these reasons, we should not recommend to create this object without this factory function.
    // User can create this object by hand. But it's fragile for the future change. So We should not recommend it.
    /**
     *  Don't touch this property directly from an user project
     *  except 3rd party project that does not install this package but uses a value returned from an other project.
     *  Instead, use {@link unwrapOk()} operator to get an inner value.
     *
     *  Historically, this type was created to target a JSVM that supports ES5.
     *  Then there was no well optimized `Symbol` to achieve a private property.
     *  We don't have a plan to change this into private property keep the backward compatibility.
     */
    readonly val: E;
}

export function isErr<T, E>(input: Result<T, E>): input is Err<E> {
    const ok = input.tag === TAG_ERR;
    return ok;
}

export function createErr<E>(err: E): Err<E> {
    const r: Err<E> = {
        tag: TAG_ERR,
        // XXX:
        //  We need to fill with `null` to improve the compatibility with Next.js
        //  see https://github.com/option-t/option-t/pull/1256
        val: err,
    };
    return r;
}

/**
 *  Return the inner `T` of a `Ok(T)`.
 *
 *  @throws {TypeError}
 *      Throws if the self is a `Err`.
 */
export function unwrapOk<T>(input: Result<T, unknown>): T {
    return expectOk(input, ERR_MSG_UNWRAP_OK_BUT_INPUT_IS_ERR);
}

/**
 *  Return the inner `E` of a `Err(E)`.
 *
 *  @throws {TypeError}
 *      Throws if the self is a `Ok`.
 */
export function unwrapErr<E>(input: Result<unknown, E>): E {
    return expectErr(input, ERR_MSG_UNWRAP_ERR_BUT_INPUT_IS_OK);
}

/**
 *  Return _input_ as `T` if the passed _input_ is `Ok(T)`.
 *  Otherwise, throw `TypeError` with the passed `msg`.
 *
 *  @throws {TypeError}
 *      Throws if the self is a `Err`.
 */
export function expectOk<T, E>(input: Result<T, E>, msg: string): T {
    if (isErr(input)) {
        throw new TypeError(msg);
    }

    return input.val;
}

/**
 *  Return _input_ as `E` if the passed _input_ is `Err(E)`.
 *  Otherwise, throw `TypeError` with the passed `msg`.
 *
 *  @throws {TypeError}
 *      Throws if the self is a `Ok`.
 */
export function expectErr<T, E>(input: Result<T, E>, msg: string): E {
    if (isOk(input)) {
        throw new TypeError(msg);
    }

    return input.val;
}

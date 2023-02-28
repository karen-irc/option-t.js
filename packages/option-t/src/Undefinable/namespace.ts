/**
 *  XXX:
 *  This module is designed to use as `import * as Undefinable from 'option-t/Undefinable/namespace';`.
 *  This is not designed for other usecases. Please do not use for other cases.
 */
export {
    type NotUndefined,
    type Undefinable,
    isNotUndefined,
    isUndefined,
    expectNotUndefined,
    unwrapUndefinable,
} from './Undefinable.js';
// XXX: `and()` operation is equivalent of `a && b` so we don't ship it by default set.
//export { andForUndefinable as and } from './and.js';
export { andThenForUndefinable as andThen } from './andThen.js';
export { andThenAsyncForUndefinable as andThenAsync } from './andThenAsync.js';
export { inspectUndefinable as inspect } from './inspect.js';
export { mapForUndefinable as map } from './map.js';
export { mapAsyncForUndefinable as mapAsync } from './mapAsync.js';
export { mapOrForUndefinable as mapOr } from './mapOr.js';
export { mapOrAsyncForUndefinable as mapOrAsync } from './mapOrAsync.js';
export { mapOrElseForUndefinable as mapOrElse } from './mapOrElse.js';
export { mapOrElseAsyncForUndefinable as mapOrElseAsync } from './mapOrElseAsync.js';
// XXX: `or()` operation is equivalent of `a || b` so we don't ship it by default set.
// export { orForUndefinable as or } from './or.js';
export { orElseForUndefinable as orElse } from './orElse.js';
export { orElseAsyncForUndefinable as orElseAsync } from './orElseAsync.js';
export { toNullableFromUndefinable as toNullable } from './toNullable.js';
export {
    toResultErrFromUndefinable as toResultErr,
    toResultOkFromUndefinable as toResultOk,
} from './toPlainResult.js';
export { unwrapOrFromUndefinable as unwrapOr } from './unwrapOr.js';
export { unwrapOrElseFromUndefinable as unwrapOrElse } from './unwrapOrElse.js';
export { unwrapOrElseAsyncFromUndefinable as unwrapOrElseAsync } from './unwrapOrElseAsync.js';

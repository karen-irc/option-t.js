/* eslint sort-keys: ["error", "asc", { caseSensitive: true }] */
import {
    DEFAULT_API_DESCRIPTOR,
    pathRedirectionTo,
    pathRedirectionForLegacy,
    pathRedirectionForRoot,
} from './api_path_descriptor.mjs';

export const apiTable = Object.freeze({
    '.': pathRedirectionForRoot('index'),

    'ClassicOption': pathRedirectionForLegacy('ClassicOption/index'),
    'ClassicResult': pathRedirectionForLegacy('ClassicResult/index'),

    'Maybe': pathRedirectionTo('Maybe/index'),
    'Maybe/Maybe': pathRedirectionTo('Maybe/maybe'),
    'Maybe/and': DEFAULT_API_DESCRIPTOR,
    'Maybe/andThen': pathRedirectionTo('Maybe/and_then'),
    'Maybe/andThenAsync': pathRedirectionTo('Maybe/and_then_async'),
    'Maybe/compat/v33': DEFAULT_API_DESCRIPTOR,
    'Maybe/expect': DEFAULT_API_DESCRIPTOR,
    'Maybe/inspect': DEFAULT_API_DESCRIPTOR,
    'Maybe/map': DEFAULT_API_DESCRIPTOR,
    'Maybe/mapAsync': pathRedirectionTo('Maybe/map_async'),
    'Maybe/mapOr': pathRedirectionTo('Maybe/map_or'),
    'Maybe/mapOrAsync': pathRedirectionTo('Maybe/map_or_async'),
    'Maybe/mapOrElse': pathRedirectionTo('Maybe/map_or_else'),
    'Maybe/mapOrElseAsync': pathRedirectionTo('Maybe/map_or_else_async'),
    'Maybe/namespace': DEFAULT_API_DESCRIPTOR,
    'Maybe/okOr': pathRedirectionTo('Maybe/ok_or'),
    'Maybe/okOrElse': pathRedirectionTo('Maybe/ok_or_else'),
    'Maybe/or': DEFAULT_API_DESCRIPTOR,
    'Maybe/orElse': pathRedirectionTo('Maybe/or_else'),
    'Maybe/orElseAsync': pathRedirectionTo('Maybe/or_else_async'),
    'Maybe/toNullable': pathRedirectionTo('Maybe/to_nullable'),
    'Maybe/toPlainResult': pathRedirectionTo('Maybe/to_plain_result'),
    'Maybe/toUndefinable': pathRedirectionTo('Maybe/to_undefinable'),
    'Maybe/unwrap': DEFAULT_API_DESCRIPTOR,
    'Maybe/unwrapOr': pathRedirectionTo('Maybe/unwrap_or'),
    'Maybe/unwrapOrElse': pathRedirectionTo('Maybe/unwrap_or_else'),
    'Maybe/unwrapOrElseAsync': pathRedirectionTo('Maybe/unwrap_or_else_async'),
    'Maybe/xor': DEFAULT_API_DESCRIPTOR,

    'Nullable': pathRedirectionTo('Nullable/index'),
    'Nullable/Nullable': pathRedirectionTo('Nullable/nullable'),
    'Nullable/and': DEFAULT_API_DESCRIPTOR,
    'Nullable/andThen': pathRedirectionTo('Nullable/and_then'),
    'Nullable/andThenAsync': pathRedirectionTo('Nullable/and_then_async'),
    'Nullable/compat/v33': DEFAULT_API_DESCRIPTOR,
    'Nullable/expect': DEFAULT_API_DESCRIPTOR,
    'Nullable/inspect': DEFAULT_API_DESCRIPTOR,
    'Nullable/map': DEFAULT_API_DESCRIPTOR,
    'Nullable/mapAsync': pathRedirectionTo('Nullable/map_async'),
    'Nullable/mapOr': pathRedirectionTo('Nullable/map_or'),
    'Nullable/mapOrAsync': pathRedirectionTo('Nullable/map_or_async'),
    'Nullable/mapOrElse': pathRedirectionTo('Nullable/map_or_else'),
    'Nullable/mapOrElseAsync': pathRedirectionTo('Nullable/map_or_else_async'),
    'Nullable/namespace': DEFAULT_API_DESCRIPTOR,
    'Nullable/okOr': pathRedirectionTo('Nullable/ok_or'),
    'Nullable/okOrElse': pathRedirectionTo('Nullable/ok_or_else'),
    'Nullable/or': DEFAULT_API_DESCRIPTOR,
    'Nullable/orElse': pathRedirectionTo('Nullable/or_else'),
    'Nullable/orElseAsync': pathRedirectionTo('Nullable/or_else_async'),
    'Nullable/toPlainResult': pathRedirectionTo('Nullable/to_plain_result'),
    'Nullable/toUndefinable': pathRedirectionTo('Nullable/to_undefinable'),
    'Nullable/unwrap': DEFAULT_API_DESCRIPTOR,
    'Nullable/unwrapOr': pathRedirectionTo('Nullable/unwrap_or'),
    'Nullable/unwrapOrElse': pathRedirectionTo('Nullable/unwrap_or_else'),
    'Nullable/unwrapOrElseAsync': pathRedirectionTo('Nullable/unwrap_or_else_async'),
    'Nullable/xor': DEFAULT_API_DESCRIPTOR,

    'PlainOption': pathRedirectionTo('PlainOption/index'),
    'PlainOption/Option': pathRedirectionTo('PlainOption/option'),
    'PlainOption/and': DEFAULT_API_DESCRIPTOR,
    'PlainOption/andThen': pathRedirectionTo('PlainOption/and_then'),
    'PlainOption/andThenAsync': pathRedirectionTo('PlainOption/and_then_async'),
    'PlainOption/asMut': pathRedirectionTo('PlainOption/as_mut'),
    'PlainOption/compat/v33': DEFAULT_API_DESCRIPTOR,
    'PlainOption/drop': DEFAULT_API_DESCRIPTOR,
    'PlainOption/equal': DEFAULT_API_DESCRIPTOR,
    'PlainOption/expect': DEFAULT_API_DESCRIPTOR,
    'PlainOption/filter': DEFAULT_API_DESCRIPTOR,
    'PlainOption/flatten': DEFAULT_API_DESCRIPTOR,
    'PlainOption/inspect': DEFAULT_API_DESCRIPTOR,
    'PlainOption/map': DEFAULT_API_DESCRIPTOR,
    'PlainOption/mapAsync': pathRedirectionTo('PlainOption/map_async'),
    'PlainOption/mapOr': pathRedirectionTo('PlainOption/map_or'),
    'PlainOption/mapOrAsync': pathRedirectionTo('PlainOption/map_or_async'),
    'PlainOption/mapOrElse': pathRedirectionTo('PlainOption/map_or_else'),
    'PlainOption/mapOrElseAsync': pathRedirectionTo('PlainOption/map_or_else_async'),
    'PlainOption/namespace': DEFAULT_API_DESCRIPTOR,
    'PlainOption/okOr': pathRedirectionTo('PlainOption/ok_or'),
    'PlainOption/okOrElse': pathRedirectionTo('PlainOption/ok_or_else'),
    'PlainOption/or': DEFAULT_API_DESCRIPTOR,
    'PlainOption/orElse': pathRedirectionTo('PlainOption/or_else'),
    'PlainOption/orElseAsync': pathRedirectionTo('PlainOption/or_else_async'),
    'PlainOption/toNullable': pathRedirectionTo('PlainOption/to_nullable'),
    'PlainOption/toUndefinable': pathRedirectionTo('PlainOption/to_undefinable'),
    'PlainOption/transpose': DEFAULT_API_DESCRIPTOR,
    'PlainOption/unwrap': DEFAULT_API_DESCRIPTOR,
    'PlainOption/unwrapOr': pathRedirectionTo('PlainOption/unwrap_or'),
    'PlainOption/unwrapOrElse': pathRedirectionTo('PlainOption/unwrap_or_else'),
    'PlainOption/unwrapOrElseAsync': pathRedirectionTo('PlainOption/unwrap_or_else_async'),
    'PlainOption/xor': DEFAULT_API_DESCRIPTOR,

    'PlainResult': pathRedirectionTo('PlainResult/index'),
    'PlainResult/Result': pathRedirectionTo('PlainResult/result'),
    'PlainResult/and': DEFAULT_API_DESCRIPTOR,
    'PlainResult/andThen': pathRedirectionTo('PlainResult/and_then'),
    'PlainResult/andThenAsync': pathRedirectionTo('PlainResult/and_then_async'),
    'PlainResult/asMut': pathRedirectionTo('PlainResult/as_mut'),
    'PlainResult/compat/v33': DEFAULT_API_DESCRIPTOR,
    'PlainResult/drop': DEFAULT_API_DESCRIPTOR,
    'PlainResult/equal': DEFAULT_API_DESCRIPTOR,
    'PlainResult/expect': DEFAULT_API_DESCRIPTOR,
    'PlainResult/flatten': DEFAULT_API_DESCRIPTOR,
    'PlainResult/fromPromiseSettledResult': pathRedirectionTo(
        'PlainResult/from_promise_settled_result'
    ),
    'PlainResult/inspect': DEFAULT_API_DESCRIPTOR,
    'PlainResult/map': DEFAULT_API_DESCRIPTOR,
    'PlainResult/mapAsync': pathRedirectionTo('PlainResult/map_async'),
    'PlainResult/mapErr': pathRedirectionTo('PlainResult/map_err'),
    'PlainResult/mapErrAsync': pathRedirectionTo('PlainResult/map_err_async'),
    'PlainResult/mapOr': pathRedirectionTo('PlainResult/map_or'),
    'PlainResult/mapOrAsync': pathRedirectionTo('PlainResult/map_or_async'),
    'PlainResult/mapOrElse': pathRedirectionTo('PlainResult/map_or_else'),
    'PlainResult/mapOrElseAsync': pathRedirectionTo('PlainResult/map_or_else_async'),
    'PlainResult/namespace': DEFAULT_API_DESCRIPTOR,
    'PlainResult/or': DEFAULT_API_DESCRIPTOR,
    'PlainResult/orElse': pathRedirectionTo('PlainResult/or_else'),
    'PlainResult/orElseAsync': pathRedirectionTo('PlainResult/or_else_async'),
    'PlainResult/toNullable': pathRedirectionTo('PlainResult/to_nullable'),
    'PlainResult/toOption': pathRedirectionTo('PlainResult/to_option'),
    'PlainResult/toUndefinable': pathRedirectionTo('PlainResult/to_undefinable'),
    'PlainResult/transpose': DEFAULT_API_DESCRIPTOR,
    'PlainResult/tryCatch': pathRedirectionTo('PlainResult/try_catch'),
    'PlainResult/tryCatchAsync': pathRedirectionTo('PlainResult/try_catch_async'),
    'PlainResult/unwrap': DEFAULT_API_DESCRIPTOR,
    'PlainResult/unwrapOr': pathRedirectionTo('PlainResult/unwrap_or'),
    'PlainResult/unwrapOrElse': pathRedirectionTo('PlainResult/unwrap_or_else'),
    'PlainResult/unwrapOrElseAsync': pathRedirectionTo('PlainResult/unwrap_or_else_async'),
    'PlainResult/unwrapOrThrowError': pathRedirectionTo('PlainResult/unwrap_or_throw_error'),

    'Undefinable': pathRedirectionTo('Undefinable/index'),
    'Undefinable/Undefinable': pathRedirectionTo('Undefinable/undefinable'),
    'Undefinable/and': DEFAULT_API_DESCRIPTOR,
    'Undefinable/andThen': pathRedirectionTo('Undefinable/and_then'),
    'Undefinable/andThenAsync': pathRedirectionTo('Undefinable/and_then_async'),
    'Undefinable/compat/v33': DEFAULT_API_DESCRIPTOR,
    'Undefinable/expect': DEFAULT_API_DESCRIPTOR,
    'Undefinable/inspect': DEFAULT_API_DESCRIPTOR,
    'Undefinable/map': DEFAULT_API_DESCRIPTOR,
    'Undefinable/mapAsync': pathRedirectionTo('Undefinable/map_async'),
    'Undefinable/mapOr': pathRedirectionTo('Undefinable/map_or'),
    'Undefinable/mapOrAsync': pathRedirectionTo('Undefinable/map_or_async'),
    'Undefinable/mapOrElse': pathRedirectionTo('Undefinable/map_or_else'),
    'Undefinable/mapOrElseAsync': pathRedirectionTo('Undefinable/map_or_else_async'),
    'Undefinable/namespace': DEFAULT_API_DESCRIPTOR,
    'Undefinable/okOr': pathRedirectionTo('Undefinable/ok_or'),
    'Undefinable/okOrElse': pathRedirectionTo('Undefinable/ok_or_else'),
    'Undefinable/or': DEFAULT_API_DESCRIPTOR,
    'Undefinable/orElse': pathRedirectionTo('Undefinable/or_else'),
    'Undefinable/orElseAsync': pathRedirectionTo('Undefinable/or_else_async'),
    'Undefinable/toNullable': pathRedirectionTo('Undefinable/to_nullable'),
    'Undefinable/toPlainResult': pathRedirectionTo('Undefinable/to_plain_result'),
    'Undefinable/unwrap': DEFAULT_API_DESCRIPTOR,
    'Undefinable/unwrapOr': pathRedirectionTo('Undefinable/unwrap_or'),
    'Undefinable/unwrapOrElse': pathRedirectionTo('Undefinable/unwrap_or_else'),
    'Undefinable/unwrapOrElseAsync': pathRedirectionTo('Undefinable/unwrap_or_else_async'),
    'Undefinable/xor': DEFAULT_API_DESCRIPTOR,
});

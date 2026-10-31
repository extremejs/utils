import { OBJECT_PROTOTYPE } from "./constants/index.js";

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 * @group Other
 * @since 1.0.0
 * @param value
 * @example
 * objectToString({}); // => "[object Object]"
 * @example
 * objectToString(2); // => "[object Number]"
 */
export function objectToString(value: unknown): `[object ${ OBJECT_STRING_TAG }]` {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Preserve the existing enum return type.
  return OBJECT_PROTOTYPE.toString.call(value) as never;
}

/**
 * Standard ECMAScript and Intl tags returned by `Object.prototype.toString`.
 *
 * Host objects and custom `Symbol.toStringTag` values may produce other tags.
 * These tags describe objects; they do not validate their types.
 * @group Other
 */
export enum OBJECT_STRING_TAG {
  ARRAY = "Array",
  ARRAY_BUFFER = "ArrayBuffer",
  SHARED_ARRAY_BUFFER = "SharedArrayBuffer",
  DATA_VIEW = "DataView",
  NUMBER = "Number",
  STRING = "String",
  BOOLEAN = "Boolean",
  OBJECT = "Object",
  DATE = "Date",
  BIG_INT = "BigInt",
  NULL = "Null",
  UNDEFINED = "Undefined",
  SYMBOL = "Symbol",
  REGEXP = "RegExp",
  ARGUMENTS = "Arguments",
  FUNCTION = "Function",
  ASYNC_FUNCTION = "AsyncFunction",
  GENERATOR_FUNCTION = "GeneratorFunction",
  ASYNC_GENERATOR_FUNCTION = "AsyncGeneratorFunction",
  GENERATOR = "Generator",
  ASYNC_GENERATOR = "AsyncGenerator",
  ITERATOR = "Iterator",
  ITERATOR_HELPER = "Iterator Helper",
  ARRAY_ITERATOR = "Array Iterator",
  STRING_ITERATOR = "String Iterator",
  MAP_ITERATOR = "Map Iterator",
  SET_ITERATOR = "Set Iterator",
  REGEXP_STRING_ITERATOR = "RegExp String Iterator",
  PROMISE = "Promise",
  MAP = "Map",
  WEAK_MAP = "WeakMap",
  SET = "Set",
  WEAK_SET = "WeakSet",
  WEAK_REF = "WeakRef",
  FINALIZATION_REGISTRY = "FinalizationRegistry",
  DISPOSABLE_STACK = "DisposableStack",
  ASYNC_DISPOSABLE_STACK = "AsyncDisposableStack",
  INT_8_ARRAY = "Int8Array",
  UINT_8_ARRAY = "Uint8Array",
  UINT_8_CLAMPED_ARRAY = "Uint8ClampedArray",
  INT_16_ARRAY = "Int16Array",
  UINT_16_ARRAY = "Uint16Array",
  INT_32_ARRAY = "Int32Array",
  UINT_32_ARRAY = "Uint32Array",
  FLOAT_16_ARRAY = "Float16Array",
  FLOAT_32_ARRAY = "Float32Array",
  FLOAT_64_ARRAY = "Float64Array",
  BIG_INT_64_ARRAY = "BigInt64Array",
  BIG_UINT_64_ARRAY = "BigUint64Array",
  ERROR = "Error",
  MATH = "Math",
  JSON = "JSON",
  REFLECT = "Reflect",
  ATOMICS = "Atomics",
  MODULE = "Module",
  INTL = "Intl",
  INTL_COLLATOR = "Intl.Collator",
  INTL_DATE_TIME_FORMAT = "Intl.DateTimeFormat",
  INTL_DISPLAY_NAMES = "Intl.DisplayNames",
  INTL_DURATION_FORMAT = "Intl.DurationFormat",
  INTL_LIST_FORMAT = "Intl.ListFormat",
  INTL_LOCALE = "Intl.Locale",
  INTL_NUMBER_FORMAT = "Intl.NumberFormat",
  INTL_PLURAL_RULES = "Intl.PluralRules",
  INTL_RELATIVE_TIME_FORMAT = "Intl.RelativeTimeFormat",
  INTL_SEGMENTER = "Intl.Segmenter",
  SEGMENTER_STRING_ITERATOR = "Segmenter String Iterator",
}

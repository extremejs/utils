import { OBJECT_PROTOTYPE } from "./internals/index.js";

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 * @group Other
 * @since 1.0.0
 * @param value
 * @example
 * objectToString({});
 * // => "[object Object]"
 * @example
 * objectToString(2);
 * // => "[object Number]"
 */
export default function objectToString(value: unknown): `[object ${ ObjectStringTagT }]` {
  return OBJECT_PROTOTYPE.toString.call(value) as never;
}

export const OBJECT_STRING_TAG = {
  ARRAY               : "Array",
  ARRAY_BUFFER        : "ArrayBuffer",
  NUMBER              : "Number",
  STRING              : "String",
  BOOLEAN             : "Boolean",
  OBJECT              : "Object",
  DATE                : "Date",
  BIG_INT             : "BigInt",
  NULL                : "Null",
  UNDEFINED           : "Undefined",
  SYMBOL              : "Symbol",
  REGEXP              : "RegExp",
  ARGUMENTS           : "Arguments",
  FUNCTION            : "Function",
  ASYNC_FUNCTION      : "AsyncFunction",
  GENERATOR_FUNCTION  : "GeneratorFunction",
  PROMISE             : "Promise",
  MAP                 : "Map",
  WEAK_MAP            : "WeakMap",
  SET                 : "Set",
  WEAK_SET            : "WeakSet",
  INT_8_ARRAY         : "Int8Array",
  UINT_8_ARRAY        : "Uint8Array",
  UINT_8_CLAMPED_ARRAY: "Uint8ClampedArray",
  INT_16_ARRAY        : "Int16Array",
  UINT_16_ARRAY       : "Uint16Array",
  INT_32_ARRAY        : "Int32Array",
  UINT_32_ARRAY       : "Uint32Array",
  FLOAT_32_ARRAY      : "Float32Array",
  FLOAT_64_ARRAY      : "Float64Array",
  BIG_INT_64_ARRAY    : "BigInt64Array",
  BIG_UINT_64_ARRAY   : "BigUint64Array",
  ERROR               : "Error",
} as const;

export type ObjectStringTagT = typeof OBJECT_STRING_TAG[keyof typeof OBJECT_STRING_TAG];

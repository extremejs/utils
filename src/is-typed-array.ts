import isArrayLikeObject from "./is-array-like-object.js";
import objectToStringTag from "./object-to-string-tag.js";

const TYPED_ARRAYS = [
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Uint16Array",
  "Int32Array",
  "Uint32Array",
  "Float32Array",
  "Float64Array",
  "BigInt64Array",
  "BigUint64Array",
];

/**
 * Checks if `value` is classified as a typed array.
 * @group Array
 * @since 1.0.0
 * @param value
 * @example
 * isTypedArray(new Uint8Array);
 * // => true
 * @example
 * isTypedArray([]);
 * // => false
 */
export default function isTypedArray<Value>(value: Value): Value extends TypedArrayT ? true : false {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (isArrayLikeObject(value) && TYPED_ARRAYS.includes(objectToStringTag(value))) as any;
}

export type TypedArrayT = BigInt64Array | BigUint64Array | Float32Array | Float64Array
| Int8Array | Int16Array | Int32Array | Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array;

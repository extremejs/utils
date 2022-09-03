import isArrayLikeObject from "./is-array-like-object.js";
import objectToString from "./object-to-string.js";

const TYPED_ARRAYS = [
  "[object Int8Array]",
  "[object Uint8Array]",
  "[object Uint8ClampedArray]",
  "[object Int16Array]",
  "[object Uint16Array]",
  "[object Int32Array]",
  "[object Uint32Array]",
  "[object Float32Array]",
  "[object Float64Array]",
  "[object BigInt64Array]",
  "[object BigUint64Array]",
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
  return (isArrayLikeObject(value) && TYPED_ARRAYS.includes(objectToString(value))) as any;
}

export type TypedArrayT = BigInt64Array | BigUint64Array | Float32Array | Float64Array
| Int8Array | Int16Array | Int32Array | Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array;

import isArrayLikeObject from "./is-array-like-object.js";
import objectToStringTag from "./object-to-string-tag.js";
import { ObjectStringTagT, OBJECT_STRING_TAG } from "./object-to-string.js";

const TYPED_ARRAYS_TAGS: ObjectStringTagT[] = [
  OBJECT_STRING_TAG.INT_8_ARRAY,
  OBJECT_STRING_TAG.UINT_8_ARRAY,
  OBJECT_STRING_TAG.UINT_8_CLAMPED_ARRAY,
  OBJECT_STRING_TAG.INT_16_ARRAY,
  OBJECT_STRING_TAG.UINT_16_ARRAY,
  OBJECT_STRING_TAG.INT_32_ARRAY,
  OBJECT_STRING_TAG.UINT_32_ARRAY,
  OBJECT_STRING_TAG.FLOAT_32_ARRAY,
  OBJECT_STRING_TAG.FLOAT_64_ARRAY,
  OBJECT_STRING_TAG.BIG_INT_64_ARRAY,
  OBJECT_STRING_TAG.BIG_UINT_64_ARRAY,
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
  return (isArrayLikeObject(value) && TYPED_ARRAYS_TAGS.includes(objectToStringTag(value))) as any;
}

export type TypedArrayT = BigInt64Array | BigUint64Array | Float32Array | Float64Array
| Int8Array | Int16Array | Int32Array | Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array;

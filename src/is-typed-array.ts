import { isArrayLikeObject } from "./is-array-like-object.js";
import { objectToStringTag } from "./object-to-string-tag.js";
import { OBJECT_STRING_TAG } from "./object-to-string.js";

const TYPED_ARRAYS_TAGS = new Set<OBJECT_STRING_TAG>([
  OBJECT_STRING_TAG.INT_8_ARRAY,
  OBJECT_STRING_TAG.UINT_8_ARRAY,
  OBJECT_STRING_TAG.UINT_8_CLAMPED_ARRAY,
  OBJECT_STRING_TAG.INT_16_ARRAY,
  OBJECT_STRING_TAG.UINT_16_ARRAY,
  OBJECT_STRING_TAG.INT_32_ARRAY,
  OBJECT_STRING_TAG.UINT_32_ARRAY,
  OBJECT_STRING_TAG.FLOAT_16_ARRAY,
  OBJECT_STRING_TAG.FLOAT_32_ARRAY,
  OBJECT_STRING_TAG.FLOAT_64_ARRAY,
  OBJECT_STRING_TAG.BIG_INT_64_ARRAY,
  OBJECT_STRING_TAG.BIG_UINT_64_ARRAY,
]);

/**
 * Checks for a non-null object with a valid array-like length and a recognized typed array tag.
 *
 * Reading `length` and `Symbol.toStringTag` can invoke getters. A custom tag
 * can affect the result.
 *
 * @group Array
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` if the length and tag checks both succeed. This includes
 * Node.js buffers and typed arrays from other realms. `DataView` returns `false`.
 * @see {@link https://lodash.com/docs/4.18.1#isTypedArray | Lodash isTypedArray} as `_.isTypedArray(value)`. In Node.js, Lodash uses the native typed array check.
 * @example
 * isTypedArray(new Uint8Array(2)); // => true
 * isTypedArray(new DataView(new ArrayBuffer(2))); // => false
 */
export function isTypedArray<Value>(value: Value): unknown extends Value
  ? boolean
  : Value extends TypedArrayT ? true : false {
  // oxlint-disable-next-line typescript/no-explicit-any typescript/no-unsafe-type-assertion
  return (isArrayLikeObject(value) && TYPED_ARRAYS_TAGS.has(objectToStringTag(value))) as any;
}

/**
 * The union of numeric and BigInt typed array instance types. Includes
 * `Float16Array` when the consumer's TypeScript libraries declare it.
 * @group Array
 */
export type TypedArrayT = BigInt64Array | BigUint64Array | Float32Array | Float64Array
  | Int8Array | Int16Array | Int32Array | Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array
  | (typeof globalThis extends { Float16Array: { prototype: infer Instance; }; } ? Instance : never);

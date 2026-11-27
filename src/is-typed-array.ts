import { getTypedArrayTag } from "./internal/builtin-brand.js";

/**
 * Checks for a genuine typed array, including Node.js buffers and foreign views.
 *
 * @group Array
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for a typed array regardless of its own `length` or `Symbol.toStringTag` properties.
 * `DataView` returns `false`.
 * @see {@link https://lodash.com/docs/4.18.1#isTypedArray | Lodash isTypedArray} as `_.isTypedArray(value)`.
 * @example
 * isTypedArray(new Uint8Array(2)); // => true
 * isTypedArray(new DataView(new ArrayBuffer(2))); // => false
 */
export function isTypedArray(value: unknown): value is TypedArrayT {
  return getTypedArrayTag.call(value) !== void 0;
}

/**
 * The union of numeric and BigInt typed array instance types. Includes
 * `Float16Array` when the consumer's TypeScript libraries declare it.
 * @group Array
 */
export type TypedArrayT = BigInt64Array | BigUint64Array | Float32Array | Float64Array
  | Int8Array | Int16Array | Int32Array | Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array
  | (typeof globalThis extends { Float16Array: { prototype: infer Instance; }; } ? Instance : never);

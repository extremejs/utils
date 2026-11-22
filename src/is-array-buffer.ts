import { isInstanceOf } from "./is-instance-of.js";

/**
 * Checks whether a value is an instance of the current realm's `ArrayBuffer` constructor.
 *
 * @group Array
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` if the local `instanceof ArrayBuffer` check succeeds.
 * Typed array views and `SharedArrayBuffer` return `false`.
 * @see {@link https://lodash.com/docs/4.18.1#isArrayBuffer | Lodash isArrayBuffer} as `_.isArrayBuffer(value)`. Lodash also recognizes array buffers from other realms.
 * @example
 * isArrayBuffer(new ArrayBuffer(8)); // => true
 * isArrayBuffer(new Uint8Array(8)); // => false
 */
export function isArrayBuffer(value: unknown): value is ArrayBuffer {
  return isInstanceOf(value, ArrayBuffer);
}

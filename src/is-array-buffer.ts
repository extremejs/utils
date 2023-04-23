import { isInstanceOf } from "./is-instance-of.js";

/**
 * Checks if `value` is an `ArrayBuffer` object.
 * @group Array
 * @since 1.0.0
 * @param value
 * @example
 * isArrayBuffer(new ArrayBuffer(2));
 * // => true
 * @example
 * isArrayBuffer(new Array(2));
 * // => false
 */
export function isArrayBuffer(value: unknown): value is ArrayBuffer {
  return isInstanceOf(value, ArrayBuffer);
}

import { isInstanceOf } from "./is-instance-of.js";

/**
 * It will determine whether the provided `value` is an Error or not.
 * @group Error
 * @since 1.0.0
 * @param value
 * @example
 * isError(new Error("error"));
 * // => true
 * @example
 * isError(new RangeError("error"));
 * // => true
 * @example
 * isError(2);
 * // => false
 */
export function isError(value: unknown): value is Error {
  return isInstanceOf(value, Error);
}

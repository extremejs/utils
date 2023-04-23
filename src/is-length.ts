import { isSafeInteger } from "./is-safe-integer.js";

/**
 * Checks if `value` is a valid array-like length.
 * @group Number
 * @since 1.0.0
 * @param value
 * @example
 * isLength(2);
 * // => true
 * @example
 * isLength(Number.MIN_VALUE);
 * // => false
 * @example
 * isLength(Infinity);
 * // => false
 * @example
 * isLength("2");
 * // => false
 */
export function isLength(value: unknown): value is number {
  return isSafeInteger(value) && value >= 0;
}

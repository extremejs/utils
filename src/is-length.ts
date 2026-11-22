import { isSafeInteger } from "./is-safe-integer.js";

/**
 * Checks whether a value can serve as an array-like length.
 *
 * @group Number
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for primitive integers from zero through `Number.MAX_SAFE_INTEGER`,
 * inclusive. Boxed numbers, strings, fractions, and negative numbers return `false`.
 * @see {@link https://lodash.com/docs/4.18.1#isLength | Lodash isLength} as `_.isLength(value)`.
 * @example
 * isLength(0); // => true
 * isLength(Number.MAX_SAFE_INTEGER); // => true
 * isLength("2"); // => false
 */
export function isLength(value: unknown): value is number {
  return isSafeInteger(value) && value >= 0;
}

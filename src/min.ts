import { identity } from "./identity.js";
import { minByFn } from "./min-by-fn.js";

/**
 * Returns the least number in an array without mutating it.
 *
 * Corresponds to Lodash's `min(numbers)` on numeric arrays. ExtremeJS skips
 * sparse array holes and propagates `NaN`. Lodash ignores `NaN` and returns
 * `undefined` when there are no comparable values. When both signed zeros tie,
 * ExtremeJS prefers negative zero and Lodash keeps the first zero.
 *
 * @group Math
 * @since 1.0.0
 * @param numbers The array of numbers to compare.
 * @returns The least number, or `Infinity` if there are no elements to compare.
 * @see {@link https://lodash.com/docs/4.18.1#min | Lodash min}
 * @example
 * min([1, 2, 3]); // => 1
 */
export function min(numbers: number[]): number {
  return minByFn(numbers, identity);
}

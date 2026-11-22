import { identity } from "./identity.js";
import { maxByFn } from "./max-by-fn.js";

/**
 * Returns the greatest number in an array without mutating it.
 *
 * Corresponds to Lodash's `max(numbers)` on numeric arrays. ExtremeJS skips
 * sparse array holes and propagates `NaN`. Lodash ignores `NaN` and returns
 * `undefined` when there are no comparable values. When both signed zeros tie,
 * ExtremeJS prefers positive zero and Lodash keeps the first zero.
 *
 * @group Math
 * @since 1.0.0
 * @param numbers The array of numbers to compare.
 * @returns The greatest number, or `-Infinity` if there are no elements to compare.
 * @see {@link https://lodash.com/docs/4.18.1#max | Lodash max}
 * @example
 * max([1, 2, 3]); // => 3
 */
export function max(numbers: number[]): number {
  return maxByFn(numbers, identity);
}

import { identity } from "./identity.js";
import { sumByFn } from "./sum-by-fn.js";

/**
 * Adds the numbers in an array, starting at positive zero. Skips sparse
 * array holes and leaves the array unchanged.
 *
 * Corresponds to Lodash's `sum(numbers)` on numeric arrays. Lodash starts at
 * the first defined value, which can preserve negative zero, and returns
 * `undefined` for a nonempty array of only holes.
 *
 * @group Math
 * @since 1.0.0
 * @param numbers The array of numbers to add.
 * @returns The sum, or zero if there are no elements to add. An input of `NaN` propagates.
 * @see {@link https://lodash.com/docs/4.18.1#sum | Lodash sum}
 * @example
 * sum([1, 2, 3]); // => 6
 */
export function sum(numbers: number[]): number {
  return sumByFn(numbers, identity);
}

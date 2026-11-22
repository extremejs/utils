import { sum } from "./sum.js";

/**
 * Adds the numbers in an array starting at positive zero and divides by
 * the full array length. Skips sparse array holes in the sum and leaves the
 * array unchanged.
 *
 * Corresponds to Lodash's `mean(numbers)` on numeric arrays. Lodash starts at
 * the first defined value, which can preserve negative zero. For a nonempty
 * array of only holes, ExtremeJS returns zero and Lodash returns `NaN`.
 *
 * @group Math
 * @since 1.0.0
 * @param numbers The array of numbers to average.
 * @returns The arithmetic mean, or `NaN` for an empty array or an input containing `NaN`.
 * @see {@link https://lodash.com/docs/4.18.1#mean | Lodash mean}
 * @example
 * mean([1, 2, 3]); // => 2
 */
export function mean(numbers: number[]): number {
  return sum(numbers) / numbers.length;
}

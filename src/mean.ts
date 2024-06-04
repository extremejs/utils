import { sum } from "./sum.js";

/**
 * It will calculate the mean of the provided `numbers`.
 * @group Array
 * @since 1.0.0
 * @param numbers
 * @example
 * mean([1, 2, 3]); // => 2
 */
export function mean(numbers: number[]): number {
  return sum(numbers) / numbers.length;
}

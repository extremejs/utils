import sumByFn from "./sum-by-fn.js";

/**
 * It will add the provided `numbers` to produce the desired `sum`.
 * @since 1.0.0
 * @param numbers
 * @example
 * sum([1, 2, 3]);
 * // => 6
 */
export default function sum(numbers: number[]): number {
  return sumByFn(numbers, number => number);
}

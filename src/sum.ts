import sumByFn from "./sum-by-fn.js";

/**
 * It will add the provided `numbers` to produce the desired `sum`.
 * @param numbers
 * @example
 * const total = sum([1, 2, 3]);
 */
export default function sum(numbers: number[]): number {
  return sumByFn(numbers, number => number);
}

import { maxByFn } from "./max-by-fn.js";

/**
 * Computes the `maximum` of the `numbers`.
 * @group Math
 * @since 1.0.0
 * @param numbers The array to iterate over.
 * @returns The maximum value.
 * @example
 * max([1, 2, 3]);
 * // => 3
 */
export function max(numbers: number[]): number {
  return maxByFn(numbers, number => number);
}

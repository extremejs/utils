import minByFn from "./min-by-fn.js";

/**
 * Computes the `minimum` of the `numbers`.
 * @group Array
 * @since 1.0.0
 * @param numbers The array to iterate over.
 * @returns The minimum value.
 * @example
 * min([1, 2, 3]);
 * // => 1
 */
export default function min(numbers: number[]): number {
  return minByFn(numbers, number => number);
}

import { identity } from "./identity.js";
import { minByFn } from "./min-by-fn.js";

/**
 * Computes the `minimum` of the `numbers`.
 * @group Math
 * @since 1.0.0
 * @param numbers The array to iterate over.
 * @returns The minimum value.
 * @example
 * min([1, 2, 3]); // => 1
 */
export function min(numbers: number[]): number {
  return minByFn(numbers, identity);
}

import { identity } from "./identity.js";
import { sumByFn } from "./sum-by-fn.js";

/**
 * It will add the provided `numbers` to produce the desired `sum`.
 * @group Math
 * @since 1.0.0
 * @param numbers
 * @example
 * sum([1, 2, 3]); // => 6
 */
export function sum(numbers: number[]): number {
  return sumByFn(numbers, identity);
}

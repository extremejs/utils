import { iteratee as iterateeUtil, type IterateeT } from "./iteratee.js";
import { sumByFn } from "./sum-by-fn.js";

/**
 * It will iterate through each element of the provided `values` array
 * and add the result of invoking `iteratee` function/property for each element to produce the desired `sum`.
 * @group Math
 * @since 1.0.0
 * @param values The array to iterate over.
 * @param iteratee The function/property to get the value per element.
 * @returns The sum value.
 * @example
 * sumByFn([1, 2, 3], number => number); // => 6
 * @example
 * sumByFn([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a); // => 6
 * @example
 * sumBy([{ a: 1 }, { a: 2 }, { a: 3 }], "a"); // => 6
 */
export function sumBy<Value>(values: Value[], iteratee: IterateeT<Value>): number {
  return sumByFn(values, iterateeUtil(iteratee, 0 as never) as never);
}

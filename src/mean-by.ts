import { type IterateeT } from "./iteratee.js";
import { sumBy } from "./sum-by.js";

/**
 * It will iterate through each element of the provided `values` array
 * and add the result of invoking `iteratee` function/property for each element to produce the desired `sum`,
 * to then be divided by the `values.length` to produce the desired `mean`.
 * @group Array
 * @since 1.0.0
 * @param values The array to iterate over.
 * @param iteratee The function/property to get the value per element.
 * @returns The mean value.
 * @example
 * meanBy([1, 2, 3], number => number); // => 2
 * @example
 * meanBy([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a); // => 2
 * @example
 * meanBy([{ a: 1 }, { a: 2 }, { a: 3 }], "a"); // => 2
 */
export function meanBy<Value>(values: Value[], iteratee: IterateeT<Value>): number {
  return sumBy(values, iteratee) / values.length;
}

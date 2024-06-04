import { iteratee as iterateeUtil, type IterateeT } from "./iteratee.js";
import { minByFn } from "./min-by-fn.js";

/**
 * It will iterate through each element of the provided `values` array
 * and return the result of invoking `iteratee` function/property for each element to produce the desired `number`,
 * to then be compared with other result `number`s to find the `minimum` value.
 * @group Math
 * @since 1.0.0
 * @param values The array to iterate over.
 * @param iteratee The function/property to get the value per element.
 * @returns The minimum value.
 * @example
 * minBy([1, 2, 3], number => number); // => 1
 * @example
 * minBy([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a); // => 1
 * @example
 * minBy([{ a: 1 }, { a: 2 }, { a: 3 }], "a"); // => 1
 */
export function minBy<Value>(values: Value[], iteratee: IterateeT<Value>): number {
  return minByFn(values, iterateeUtil(iteratee, Infinity as never) as never);
}

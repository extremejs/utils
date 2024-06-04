import { iteratee as iterateeUtil, type IterateeT } from "./iteratee.js";
import { maxByFn } from "./max-by-fn.js";

/**
 * It will iterate through each element of the provided `values` array
 * and return the result of invoking `iteratee` function/property for each element to produce the desired `number`,
 * to then be compared with other result `number`s to find the `maximum` value.
 * @group Math
 * @since 1.0.0
 * @param values The array to iterate over.
 * @param iteratee The function/property to get the value per element.
 * @returns The maximum value.
 * @example
 * maxBy([1, 2, 3], number => number); // => 3
 * @example
 * maxBy([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a); // => 3
 * @example
 * maxBy([{ a: 1 }, { a: 2 }, { a: 3 }], "a"); // => 3
 */
export function maxBy<Value>(values: Value[], iteratee: IterateeT<Value>): number {
  return maxByFn(values, iterateeUtil(iteratee, -Infinity as never) as never);
}

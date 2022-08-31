import sumByFn from "./sum-by-fn.js";

/**
 * It will iterate through each of the provided `values` array,
 * by the provided `iteratee` function
 * and add the resulting numbers returned by the said `iteratee` function to produce the `sum`,
 * to then be divided by the `values.length` to produce the desired `mean`.
 * @since 1.0.0
 * @param values
 * @param iteratee
 * @example
 * meanByFn([1, 2, 3], number => number);
 * // => 2
 * @example
 * meanByFn([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a);
 * // => 2
 */
export default function meanByFn<Value>(values: Value[], iteratee: (value: Value) => number): number {
  return sumByFn(values, iteratee) / values.length;
}

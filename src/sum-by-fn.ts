/**
 * It will iterate through each of the provided `values` array,
 * by the provided `iteratee` function
 * and add the resulting numbers returned by the said `iteratee` function to produce the desired `sum`.
 * @group Array
 * @since 1.0.0
 * @param values
 * @param iteratee
 * @example
 * sumByFn([1, 2, 3], number => number);
 * // => 6
 * @example
 * sumByFn([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a);
 * // => 6
 */
export function sumByFn<Value>(values: Value[], iteratee: (value: Value) => number): number {
  return values.reduce(
    (previousValue, currentValue) => previousValue + iteratee(currentValue),
    0,
  );
}

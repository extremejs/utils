/**
 * It will iterate through each of the provided `values` array,
 * by the provided `iteratee` function
 * and add the resulting numbers returned by the said `iteratee` function to produce the desired `sum`.
 * @param values
 * @param iteratee
 * @example
 * const sum = sumByFn([1, 2, 3], number => number);
 * @example
 * const sum = sumByFn([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a);
 */
export default function sumByFn<Value>(values: Value[], iteratee: (value: Value) => number): number {
  return values.reduce(
    (previousValue, currentValue) => previousValue + iteratee(currentValue),
    0,
  );
}

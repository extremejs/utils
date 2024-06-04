/**
 * Computes the `maximum` of the values returned by the `iteratee` for each element in the array.
 * @group Math
 * @since 1.0.0
 * @param values The array to iterate over.
 * @param iteratee The iteratee invoked per element.
 * @returns The maximum value.
 * @example
 * maxByFn([1, 2, 3], number => number); // => 3
 * @example
 * maxByFn([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a); // => 3
 */
export function maxByFn<Value>(values: Value[], iteratee: (value: Value) => number): number {
  return values.reduce(
    (previousValue, currentValue) => Math.max(previousValue, iteratee(currentValue)),
    -Infinity,
  );
}

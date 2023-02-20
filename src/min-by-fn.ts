/**
 * It will iterate through each of the provided `values` array,
 * by the provided `iteratee` function
 * and add the resulting numbers returned by the said `iteratee` function to produce the `minimum`,
 * @group Array
 * @since 1.0.0
 * @param values The array to iterate over.
 * @param iteratee The iteratee invoked per element.
 * @returns The minimum value.
 * @example
 * minByFn([1, 2, 3], number => number);
 * // => 1
 * @example
 * minByFn([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a);
 * // => 1
 */
export default function minByFn<Value>(values: Value[], iteratee: (value: Value) => number): number {
  return values.reduce(
    (previousValue, currentValue) => Math.min(previousValue, iteratee(currentValue)),
    Infinity,
  );
}

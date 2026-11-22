/**
 * Sums the numbers returned by a callback, starting at zero.
 * Visits elements in order, skips sparse array holes, and leaves the array unchanged.
 * Exceptions from the callback propagate to the caller.
 *
 * Corresponds to Lodash's `sumBy(values, iteratee)` callback form, passing only
 * the current element. The callback is required and must return a number.
 * Lodash visits array holes with `undefined` and skips `undefined` callback results.
 * Its sum starts at the first defined value, which can preserve negative zero.
 *
 * @group Math
 * @since 1.0.0
 * @param values The array to iterate over.
 * @param iteratee A callback that returns a number for the current element.
 * @returns The sum, or zero for an empty array. A returned `NaN` propagates to the result.
 * @see {@link https://lodash.com/docs/4.18.1#sumBy | Lodash sumBy}
 * @example
 * sumByFn([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a); // => 6
 */
export function sumByFn<Value>(values: Value[], iteratee: (value: Value) => number): number {
  return values.reduce(
    (previousValue, currentValue) => previousValue + iteratee(currentValue),
    0,
  );
}

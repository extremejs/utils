/**
 * Returns the least number returned by a callback.
 * Skips sparse array holes and leaves the array unchanged.
 *
 * Corresponds to Lodash's `minBy(values, callback)`.
 * Lodash returns the first winning element, ignores `NaN` scores, and yields
 * `undefined` if no comparable score exists. Read the score from the winning
 * element to obtain a number from Lodash when the selectors and results agree.
 * When both signed zeros tie, ExtremeJS prefers negative zero. Lodash can
 * return the element with the other sign if it occurs first.
 *
 * Both pass only the current element to the callback. Lodash also visits holes
 * with `undefined`. Callback exceptions propagate.
 *
 * @group Math
 * @since 1.0.0
 * @param values The array of elements to visit.
 * @param iteratee A required callback that returns a number for the current element.
 * @returns The least score, or `Infinity` if there are no scores to compare. A selected `NaN` propagates.
 * @see {@link https://lodash.com/docs/4.18.1#minBy | Lodash minBy}
 * @example
 * minByFn([{ score: 1 }, { score: 3 }], record => record.score); // => 1
 */
export function minByFn<Value>(values: Value[], iteratee: (value: Value) => number): number {
  return values.reduce(
    (previousValue, currentValue) => Math.min(previousValue, iteratee(currentValue)),
    Infinity,
  );
}

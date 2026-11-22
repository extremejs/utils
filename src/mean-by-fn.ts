import { sumByFn } from "./sum-by-fn.js";

/**
 * Averages numbers returned by a callback.
 * Starts the sum at positive zero and divides by the full array length.
 * Skips sparse array holes during summation and leaves the array unchanged.
 *
 * Corresponds to Lodash's `meanBy(values, callback)`.
 * Lodash defaults to an identity selector and starts the sum with the first
 * defined value, which can preserve negative zero.
 *
 * Both pass only the current element to the callback. Lodash also visits holes
 * with `undefined`. Callback exceptions propagate.
 *
 * @group Math
 * @since 1.0.0
 * @param values The array of elements to visit.
 * @param iteratee A required callback that returns a number for the current element.
 * @returns The arithmetic mean, or `NaN` for an empty array or a selected `NaN`.
 * @see {@link https://lodash.com/docs/4.18.1#meanBy | Lodash meanBy}
 * @example
 * meanByFn([{ score: 1 }, { score: 3 }], record => record.score); // => 2
 */
export function meanByFn<Value>(values: Value[], iteratee: (value: Value) => number): number {
  return sumByFn(values, iteratee) / values.length;
}

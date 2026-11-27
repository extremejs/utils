import { type IterateeT } from "./iteratee.js";
import { sumBy } from "./sum-by.js";

/**
 * Averages numbers selected by a callback or property path.
 * Starts the sum at positive zero and divides by the full array length.
 * Skips sparse array holes during summation and leaves the array unchanged.
 *
 * Corresponds to Lodash's `meanBy(values, callback)` and `meanBy(values, path)`.
 * Lodash defaults to an identity selector and starts the sum with the first
 * defined value, which can preserve negative zero.
 *
 * Both pass only the current element to the callback. Lodash also visits holes
 * with `undefined`. Callback exceptions propagate.
 *
 * Property selectors follow ExtremeJS {@link get} paths. Dotted paths traverse
 * nested properties even when a matching literal key exists. Missing or
 * nullish properties count as `0`. Lodash skips `undefined` and uses `null` in the sum. If every lookup yields
 * `undefined` on nonempty input, Lodash returns `NaN`.
 *
 * @group Math
 * @since 1.0.0
 * @param values The array of elements to visit.
 * @param iteratee A required callback returning a number, or a key or path to a numeric property.
 * @returns The arithmetic mean, or `NaN` for an empty array or a selected `NaN`.
 * @see {@link https://lodash.com/docs/4.18.1#meanBy | Lodash meanBy}
 * @example
 * meanBy([{ score: 1 }, { score: 3 }], record => record.score); // => 2
 * @example
 * meanBy([{ score: 1 }, { score: 3 }], "score"); // => 2
 */
export function meanBy<Value>(values: Value[], iteratee: Exclude<IterateeT<Value>, readonly PropertyKey[]>): number {
  return sumBy(values, iteratee) / values.length;
}

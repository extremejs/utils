import { type IterateeT, iteratee as iterateeUtil } from "./iteratee.js";
import { maxByFn } from "./max-by-fn.js";

/**
 * Returns the greatest number selected by a callback or property path.
 * Skips sparse array holes and leaves the array unchanged.
 *
 * Corresponds to Lodash's `maxBy(values, callback)` and `maxBy(values, path)`.
 * Lodash returns the first winning element, ignores `NaN` scores, and yields
 * `undefined` if no comparable score exists. Read the score from the winning
 * element to obtain a number from Lodash when the selectors and results agree.
 * When both signed zeros tie, ExtremeJS prefers positive zero. Lodash can
 * return the element with the other sign if it occurs first.
 *
 * Both pass only the current element to the callback. Lodash also visits holes
 * with `undefined`. Callback exceptions propagate.
 *
 * Property selectors follow ExtremeJS {@link get} paths. Dotted paths traverse
 * nested properties even when a matching literal key exists. Missing or
 * nullish properties count as `-Infinity`. Lodash skips both when selecting an element.
 *
 * @group Math
 * @since 1.0.0
 * @param values The array of elements to visit.
 * @param iteratee A required callback returning a number, or a key or path to a numeric property.
 * @returns The greatest score, or `-Infinity` if there are no scores to compare. A selected `NaN` propagates.
 * @see {@link https://lodash.com/docs/4.18.1#maxBy | Lodash maxBy}
 * @example
 * maxBy([{ score: 1 }, { score: 3 }], record => record.score); // => 3
 * @example
 * maxBy([{ score: 1 }, { score: 3 }], "score"); // => 3
 */
export function maxBy<Value>(values: Value[], iteratee: Exclude<IterateeT<Value>, readonly PropertyKey[]>): number {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Preserve the existing generic return type.
  return maxByFn(values, iterateeUtil(iteratee, -Infinity as never) as never);
}

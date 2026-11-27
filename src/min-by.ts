import { type DefaultPropertyT, type NumericPropertyT, numericProperty } from "./internal/numeric-property.js";
import { minByFn } from "./min-by-fn.js";
import { type PropertyT } from "./to-path.js";

/**
 * Returns the least number selected by a callback or property path.
 * Skips sparse array holes and leaves the array unchanged.
 *
 * Corresponds to Lodash's `minBy(values, callback)` and `minBy(values, path)`.
 * Lodash returns the first winning element, ignores `NaN` scores, and yields
 * `undefined` if no comparable score exists. Read the score from the winning
 * element to obtain a number from Lodash when the selectors and results agree.
 * When both signed zeros tie, ExtremeJS prefers negative zero. Lodash can
 * return the element with the other sign if it occurs first.
 *
 * Both pass only the current element to the callback. Lodash also visits holes
 * with `undefined`. Callback exceptions propagate.
 *
 * Property selectors follow ExtremeJS {@link get} paths. Dotted paths traverse
 * nested properties even when a matching literal key exists. Missing or
 * nullish properties count as `Infinity`. Lodash skips both when selecting an element.
 *
 * Use a segment array for explicit keys such as `["stats", 0, "score"]`.
 *
 * @group Math
 * @since 1.0.0
 * @param values The array of elements to visit.
 * @param iteratee A required callback returning a number, or a key or path to a numeric property.
 * @returns The least score, or `Infinity` if there are no scores to compare. A selected `NaN` propagates.
 * @see {@link minElementBy} to return the original winning element.
 * @see {@link https://lodash.com/docs/4.18.1#minBy | Lodash minBy}
 * @example
 * minBy([{ score: 1 }, { score: 3 }], record => record.score); // => 1
 * @example
 * minBy([{ score: 1 }, { score: 3 }], "score"); // => 1
 */
export function minBy<Value, const Property extends PropertyT = DefaultPropertyT<Value>>(
  values: Value[],
  iteratee: ((value: Value) => number) | (Property & NumericPropertyT<Value, Property>),
): number {
  return minByFn(values, typeof iteratee === "function" ? iteratee : numericProperty(iteratee, Infinity));
}

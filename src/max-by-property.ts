import { type DefaultPropertyT, type NumericPropertyT, numericProperty } from "./internal/numeric-property.js";
import { maxByFn } from "./max-by-fn.js";
import { type PropertyT } from "./to-path.js";

/**
 * Returns the greatest number read from a key or property path.
 * Skips sparse array holes and leaves the array unchanged.
 *
 * Corresponds to Lodash's `maxBy(values, path)`.
 * Lodash returns the first winning element, ignores `NaN` scores, and yields
 * `undefined` if no comparable score exists. Read the score from the winning
 * element to obtain a number from Lodash when the selectors and results agree.
 * When both signed zeros tie, ExtremeJS prefers positive zero. Lodash can
 * return the element with the other sign if it occurs first.
 *
 * Property selectors follow ExtremeJS {@link get} paths. Dotted paths traverse
 * nested properties even when a matching literal key exists. Missing or
 * nullish properties count as `-Infinity`. Lodash skips both when selecting an element.
 *
 * Use a segment array for explicit keys such as `["stats", 0, "score"]`.
 *
 * @group Math
 * @since 1.0.0
 * @param values The array of elements to visit.
 * @param property The required key or path to a numeric property.
 * @returns The greatest score, or `-Infinity` if there are no scores to compare. A selected `NaN` propagates.
 * @see {@link https://lodash.com/docs/4.18.1#maxBy | Lodash maxBy}
 * @example
 * maxByProperty([{ score: 1 }, { score: 3 }], "score"); // => 3
 */
export function maxByProperty<Value, const Property extends PropertyT = DefaultPropertyT<Value>>(
  values: Value[],
  property: Property & NumericPropertyT<Value, Property>,
): number {
  return maxByFn(values, numericProperty(property, -Infinity));
}

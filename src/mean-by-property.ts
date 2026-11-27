import { type DefaultPropertyT, type NumericPropertyT } from "./internal/numeric-property.js";
import { sumByProperty } from "./sum-by-property.js";
import { type PropertyT } from "./to-path.js";

/**
 * Averages numbers read from a key or property path.
 * Starts the sum at positive zero and divides by the full array length.
 * Skips sparse array holes during summation and leaves the array unchanged.
 *
 * Corresponds to Lodash's `meanBy(values, path)`.
 * Lodash defaults to an identity selector and starts the sum with the first
 * defined value, which can preserve negative zero.
 *
 * Property selectors follow ExtremeJS {@link get} paths. Dotted paths traverse
 * nested properties even when a matching literal key exists. Missing or
 * nullish properties count as `0`. Lodash skips `undefined` and uses `null` in the sum. If every lookup yields
 * `undefined` on nonempty input, Lodash returns `NaN`.
 *
 * Use a segment array for explicit keys such as `["stats", 0, "score"]`.
 *
 * @group Math
 * @since 1.0.0
 * @param values The array of elements to visit.
 * @param property The required key or path to a numeric property.
 * @returns The arithmetic mean, or `NaN` for an empty array or a selected `NaN`.
 * @see {@link https://lodash.com/docs/4.18.1#meanBy | Lodash meanBy}
 * @example
 * meanByProperty([{ score: 1 }, { score: 3 }], "score"); // => 2
 */
export function meanByProperty<Value, const Property extends PropertyT = DefaultPropertyT<Value>>(
  values: Value[],
  property: Property & NumericPropertyT<Value, Property>,
): number {
  return sumByProperty<Value, Property>(values, property) / values.length;
}

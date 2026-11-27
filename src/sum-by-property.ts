import { type DefaultPropertyT, type NumericPropertyT, numericProperty } from "./internal/numeric-property.js";
import { sumByFn } from "./sum-by-fn.js";
import { type PropertyT } from "./to-path.js";

/**
 * Sums numeric properties selected by the same key or path on each element,
 * starting at positive zero. Skips sparse array holes and leaves the array unchanged.
 *
 * Corresponds to Lodash's `sumBy(values, path)` property shorthand. This utility
 * uses ExtremeJS {@link get} paths, so dotted paths traverse nested properties
 * even when a matching literal key exists. Missing, `null`, or `undefined` values
 * contribute zero. Lodash skips `undefined` and uses `null` as a value.
 * If every lookup in a nonempty array yields `undefined`, Lodash returns
 * `undefined`. Its sum starts at the first defined value, which can preserve
 * negative zero.
 *
 * Use a segment array for explicit keys such as `["stats", 0, "score"]`.
 *
 * @group Math
 * @since 1.0.0
 * @param values The array of records to iterate over.
 * @param property The required key or path to a numeric property.
 * @returns The sum, or zero for an empty array. A selected `NaN` propagates to the result.
 * @see {@link https://lodash.com/docs/4.18.1#sumBy | Lodash sumBy}
 * @example
 * sumByProperty([{ a: 1 }, { a: 2 }, { a: 3 }], "a"); // => 6
 */
export function sumByProperty<Value, const Property extends PropertyT = DefaultPropertyT<Value>>(
  values: Value[],
  property: Property & NumericPropertyT<Value, Property>,
): number {
  return sumByFn(values, numericProperty(property, 0));
}

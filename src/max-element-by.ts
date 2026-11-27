import { elementBy } from "./internal/element-by.js";
import { type DefaultPropertyT, type NumericPropertyT, numericProperty } from "./internal/numeric-property.js";
import { type PropertyT } from "./to-path.js";

/**
 * Returns the original element with the greatest selected score.
 * Skips array holes and missing, nullish, or `NaN` scores. Both infinities
 * qualify. Tied scores, including signed zeros, keep the first element.
 *
 * Unlike Lodash, the selector is required and a callback is called only for
 * present elements. Property selectors use ExtremeJS {@link get} paths.
 * Use segment arrays to select literal keys containing dots or brackets.
 *
 * @group Math
 * @since 1.0.0
 * @param values The array of elements to visit.
 * @param iteratee A callback returning a number, or a key or path to a numeric property.
 * @returns The first winning element, or `undefined` if no score qualifies.
 * @see {@link maxBy} to return the score.
 * @see {@link https://lodash.com/docs/4.18.1#maxBy | Lodash maxBy}
 * @example
 * maxElementBy([{ stats: { score: 1 } }, { stats: { score: 3 } }], ["stats", "score"]); // => { stats: { score: 3 } }
 */
export function maxElementBy<Value, const Property extends PropertyT = DefaultPropertyT<Value>>(
  values: readonly Value[],
  iteratee: ((value: Value) => number) | (Property & NumericPropertyT<Value, Property>),
): Value | undefined {
  return elementBy(
    values,
    typeof iteratee === "function" ? iteratee : numericProperty(iteratee, void 0),
    (score, bestScore) => score > bestScore,
  );
}

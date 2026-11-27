import { type IterateeT, iteratee as iterateeUtil } from "./iteratee.js";
import { sumByFn } from "./sum-by-fn.js";

/**
 * Sums numbers selected by a callback or property path, starting at positive zero.
 * Visits elements in order, skips sparse array holes, and leaves the array unchanged.
 *
 * Supply an explicit selector. Lodash defaults to its identity callback.
 * Both libraries pass only the current element to the callback. Lodash visits
 * array holes with `undefined` and starts its sum at the first defined value,
 * which can preserve negative zero. Lodash skips `undefined` callback results.
 * Here, callbacks should return numbers, since an `undefined` result produces `NaN`.
 *
 * For shorthand calls, use an ExtremeJS {@link get} path. Dotted paths traverse
 * nested properties even when a matching literal key exists. Missing, `null`,
 * or `undefined` properties contribute zero. Lodash includes `null` as a value
 * and skips `undefined`. If every lookup in a nonempty array yields
 * `undefined`, Lodash returns `undefined`.
 *
 * @group Math
 * @since 1.0.0
 * @param values The array to iterate over.
 * @param iteratee A function returning a number or a key or path to a numeric property.
 * @returns The sum, or zero for an empty array. A selected `NaN` propagates to the result.
 * @see {@link https://lodash.com/docs/4.18.1#sumBy | Lodash sumBy}
 * @example
 * sumBy([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a); // => 6
 * @example
 * sumBy([{ a: { b: 1 } }, { a: { b: 2 } }], "a.b"); // => 3
 */
export function sumBy<Value>(values: Value[], iteratee: Exclude<IterateeT<Value>, readonly PropertyKey[]>): number {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Preserve the existing generic return type.
  return sumByFn(values, iterateeUtil(iteratee, 0 as never) as never);
}

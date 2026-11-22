import { type RecordT } from "./constants/index.js";
import { type ValueAtT, get } from "./get.js";
import { type PathT } from "./to-path.js";

/**
 * Creates a unary accessor for a property key or path, including inherited properties.
 *
 * The accessor uses {@link get} with the supplied fallback. Pass a string
 * with dot or simple unquoted bracket notation, or a direct numeric or symbol key.
 * The accessor reads the current value each time it is called.
 *
 * @group Object
 * @since 1.0.0
 * @typeParam Property The property key or path to capture.
 * @typeParam Fallback The type of the optional fallback.
 * @param path The property key or path to read.
 * @param fallback The result for a missing or nullish value. Defaults to `undefined`.
 * @returns An accessor that takes an object or array.
 * @see {@link https://lodash.com/docs/4.18.1#property | Lodash property} as `_.property(path)`.
 * Lodash accepts segment arrays, prefers existing literal keys, distinguishes numeric
 * `-0` from `0`, and returns `null` for a null-valued property. To provide a Lodash
 * fallback at call time, use `value => _.get(value, path, fallback)` for undefined results.
 * @example
 * const readScore = property("items[0].score", 0);
 * readScore({ items: [{ score: 2 }] }); // => 2
 * readScore({ items: [] }); // => 0
 */
export function property<
  Property extends PropertyKey,
  Fallback = undefined,
>(path: Property, fallback?: Fallback): PropertyAccessorT<Property, Fallback> {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Preserve the existing generic return type.
  return value => get(value, path as never, fallback as never) as never;
}

/**
 * A unary accessor for a property key or path and an optional fallback.
 * @group Object
 * @typeParam Property The captured key or path.
 * @typeParam Fallback The fallback type.
 */
export type PropertyAccessorT<
  Property extends PropertyKey,
  Fallback,
> = <Value extends RecordT>(value: Value) => Fallback | ValueAtT<Value, PathT<Property>>;

import { type RecordT } from "./constants/index.js";
import { type ValueAtT } from "./get.js";
import { type FallbackArgsT, type ReadResultT, readPath } from "./internal/read-path.js";
import { type PathT, type PropertyT, toPath } from "./to-path.js";

/**
 * Creates a unary accessor for a property key or path, including inherited properties.
 *
 * The accessor uses the same path syntax and nullish fallback as {@link get}.
 * It captures a copy of the path and reads the current value on each call.
 *
 * @group Object
 * @since 1.0.0
 * @typeParam Property The property key or path to capture.
 * @typeParam Fallback The type of the optional fallback.
 * @param path The property key or path to read.
 * @param fallback The result for a missing or nullish value. Defaults to `undefined`.
 * @returns An accessor that takes an object or array.
 * @see {@link https://lodash.com/docs/4.18.1#property | Lodash property} as `_.property(path)`.
 * Lodash prefers existing literal keys, distinguishes numeric
 * `-0` from `0`, and returns `null` for a null-valued property. To provide a Lodash
 * fallback at call time, use `value => _.get(value, path, fallback)` for undefined results.
 * @example
 * const readScore = property("items[0].score", 0);
 * readScore({ items: [{ score: 2 }] }); // => 2
 * readScore({ items: [] }); // => 0
 */
export function property<
  const Property extends PropertyT,
  Fallback = undefined,
>(path: Property, ...fallback: FallbackArgsT<Fallback>): PropertyAccessorT<Property, Fallback>;
export function property(path: PropertyT, fallback?: unknown): (value: RecordT) => unknown {
  let parsed = typeof path === "object" ? toPath(path) : void 0;

  return value => readPath(value, (parsed ??= toPath(path))) ?? fallback;
}

/**
 * A unary accessor for a property key or path and an optional fallback.
 * @group Object
 * @typeParam Property The captured key or path.
 * @typeParam Fallback The fallback type.
 */
export type PropertyAccessorT<
  Property extends PropertyT,
  Fallback,
> = <Value extends RecordT>(value: Value) => ReadResultT<ValueAtT<Value, PathT<Property>>, Fallback>;

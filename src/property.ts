import { get, type ValueAtT } from "./get.js";
import { type RecordT } from "./internals/index.js";
import { type PathT } from "./to-path.js";

/**
 * Creates a function that returns the value at `path` of a given object.
 * @group Object
 * @since 1.0.0
 * @param path The path of the property to get.
 * @param fallback The fallback value in case of not finding the value of the desired property.
 * @returns The new accessor function.
 * @example
 * const fn = property("foo"); // => (value) => get(value, "foo");
 *
 * fn({ foo: "bar" }); // => "bar"
 * @example
 * const fn = property("foo.bar", 0); // => (value) => get(value, "foo.bar", 0);
 *
 * fn({ foo: "bar" }); // => 0
 */
export function property<
  Property extends PropertyKey,
  Fallback,
>(path: Property, fallback?: Fallback): PropertyAccessorT<Property, Fallback> {
  return value => get(value, path as never, fallback as never) as never;
}

/**
 *
 * @group Object
 */
export type PropertyAccessorT<
  Property extends PropertyKey,
  Fallback,
> = <Value extends RecordT>(value: Value) => Fallback | ValueAtT<Value, PathT<Property>>;

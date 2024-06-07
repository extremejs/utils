import { type RecordT } from "./constants/index.js";
import { type CalculatedPathT, type CalculatedPropertyT } from "./get.js";
import { isFunction } from "./is-function.js";
import { property, type PropertyAccessorT } from "./property.js";

/**
 * Creates a function that invokes `fn` with the arguments of the created function.
 * If `fn` is a property name, the created function returns the property value for a given element.
 *
 * @group Other
 * @since 1.0.0
 * @param fn The value to convert to a callback.
 * @param fallback The fallback value to use, in case of `fn` being a property name.
 * @returns The callback.
 * @example
 * const callback = iteratee("foo"); // => (value) => get(value, "foo");
 *
 * callback({ foo: "bar" }); // => "bar"
 * @example
 * const callback = iteratee((foo: { bar: string }) => foo.bar); // => (foo: { bar: string }) => foo.bar;
 *
 * callback({ bar: "baz" }); // => "baz"
 */
export function iteratee<
  Iteratee extends IterateeT,
  Fallback = undefined,
>(
  fn: Iteratee,
  fallback?: Iteratee extends PropertyKey ? Fallback : never,
): Iteratee extends PropertyKey ? PropertyAccessorT<Iteratee, Fallback> : Iteratee {
  if (isFunction(fn)) return fn as never;

  return property(fn, fallback) as never;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IterateeT<Value = any, Return = any> = Value extends RecordT
  ? CalculatedPropertyT<CalculatedPathT<Value>> | IterateeFnT<Value, Return>
  : IterateeFnT<Value, Return>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IterateeFnT<Value = any, Return = any> = (value: Value) => Return;

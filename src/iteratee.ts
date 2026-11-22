import { type RecordT } from "./constants/index.js";
import { type CalculatedPathT, type CalculatedPropertyT } from "./get.js";
import { isFunction } from "./is-function.js";
import { type PropertyAccessorT, property } from "./property.js";

/**
 * Returns a function unchanged or turns a property shorthand into an accessor.
 *
 * The shorthand uses {@link property} and {@link get} for path parsing,
 * inherited reads, and fallback behavior. Supply an explicit function
 * for identity or matching predicates.
 *
 * @group Other
 * @since 1.0.0
 * @typeParam Iteratee The function or property shorthand.
 * @typeParam Fallback The fallback type for a property shorthand.
 * @param fn The function or property shorthand to use.
 * @param fallback The result for missing or nullish properties. Defaults to `undefined`.
 * @returns The original function or a unary property accessor.
 * @see {@link https://lodash.com/docs/4.18.1#iteratee | Lodash iteratee} as `_.iteratee(fn)`.
 * Lodash also accepts nullish identity, object matching, and `[path, value]` matching
 * shorthands. Its property shorthand has no captured fallback.
 * @example
 * const readScore = iteratee("stats.score", 0);
 * readScore({ stats: {} }); // => 0
 * @example
 * const double = iteratee((value: number) => value * 2);
 * double(3); // => 6
 */
export function iteratee<
  Iteratee extends IterateeT,
  Fallback = undefined,
>(
  fn: Iteratee,
  fallback?: Iteratee extends PropertyKey ? Fallback : never,
): Iteratee extends PropertyKey ? PropertyAccessorT<Iteratee, Fallback> : Iteratee {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Preserve the existing generic return type.
  if (isFunction(fn)) return fn as never;

  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Preserve the existing generic return type.
  return property(fn, fallback) as never;
}

/**
 * A unary function or property shorthand for the supplied value type.
 * @group Other
 * @typeParam Value The callback's input type.
 * @typeParam Return The callback's result type.
 */
// oxlint-disable-next-line typescript/no-explicit-any
export type IterateeT<Value = any, Return = any> = Value extends RecordT
  ? CalculatedPropertyT<CalculatedPathT<Value>> | IterateeFnT<Value, Return>
  : IterateeFnT<Value, Return>;

/**
 * A unary function for selecting a result from a value.
 * @group Other
 * @typeParam Value The callback's input type.
 * @typeParam Return The callback's result type.
 */
// oxlint-disable-next-line typescript/no-explicit-any
export type IterateeFnT<Value = any, Return = any> = (value: Value) => Return;

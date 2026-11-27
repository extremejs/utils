import { type RecordT } from "./constants/index.js";
import { type CalculatedPathT, type CalculatedPropertyT } from "./get.js";
import { type FallbackArgsT } from "./internal/read-path.js";
import { isFunction } from "./is-function.js";
import { type PropertyAccessorT, property } from "./property.js";
import { type PropertyT } from "./to-path.js";

/**
 * Returns a function unchanged or turns a property shorthand into an accessor.
 *
 * The shorthand uses {@link property} and {@link get} for path parsing,
 * inherited reads, and fallback behavior. It accepts numeric and symbol keys,
 * strings, and explicit segment arrays. Pass `identity` or a matching predicate
 * as a function.
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
  const Iteratee extends PropertyT | IterateeFnT,
  Fallback = undefined,
>(
  fn: Iteratee,
  ...fallback:
    | [fallback: Iteratee extends PropertyT ? Fallback : never]
    | (Iteratee extends PropertyT ? Extract<FallbackArgsT<Fallback>, []> : [])
): Iteratee extends PropertyT ? PropertyAccessorT<Iteratee, Fallback> : Iteratee;
export function iteratee(fn: PropertyT | IterateeFnT, fallback?: unknown): IterateeFnT {
  if (isFunction(fn)) return fn;

  return property(fn, fallback);
}

/**
 * A unary function or property shorthand for the supplied value type.
 * @group Other
 * @typeParam Value The callback's input type.
 * @typeParam Return The callback's result type.
 */
// oxlint-disable-next-line typescript/no-explicit-any
export type IterateeT<Value = any, Return = any> = unknown extends Value
  ? PropertyT | IterateeFnT<Value, Return>
  : Value extends RecordT
    ? CalculatedPropertyT<CalculatedPathT<Value>> | readonly PropertyKey[] | IterateeFnT<Value, Return>
    : IterateeFnT<Value, Return>;

/**
 * A unary function for selecting a result from a value.
 * @group Other
 * @typeParam Value The callback's input type.
 * @typeParam Return The callback's result type.
 */
// oxlint-disable-next-line typescript/no-explicit-any
export type IterateeFnT<Value = any, Return = any> = (value: Value) => Return;

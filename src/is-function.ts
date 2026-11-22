import { isTypeOf } from "./is-type-of.js";
import { TYPE } from "./type-of.js";

/**
 * Checks whether JavaScript reports a value as a function with `typeof`.
 *
 * @group Function
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for functions, including async functions, generators, classes, and
 * callable proxies. Class constructors still require `new`.
 * @see {@link https://lodash.com/docs/4.18.1#isFunction | Lodash isFunction} as `_.isFunction(value)`. Lodash checks object tags and can differ for async generators and custom `Symbol.toStringTag` values.
 * @example
 * isFunction(() => 0); // => true
 * isFunction(class Example {}); // => true
 * isFunction(2); // => false
 */
export function isFunction(value: unknown): value is FunctionT {
  return isTypeOf(value, TYPE.FUNCTION);
}

/**
 * A function signature with arbitrary arguments and result.
 * @group Function
 */
// oxlint-disable-next-line typescript/no-explicit-any
export type FunctionT = (...args: any[]) => any;

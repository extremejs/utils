import isTypeOf from "./is-type-of.js";
import { TYPE } from "./type-of.js";

/**
 * It will determine whether the provided `value` is a function or not.
 * @since 1.0.0
 * @param value
 * @example
 * isFunction(() => 0);
 * // => true
 * @example
 * isFunction(2);
 * // => false
 */
export default function isFunction(value: unknown): value is FunctionT {
  return isTypeOf(value, TYPE.FUNCTION);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FunctionT = (...args: any[]) => any;

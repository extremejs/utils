import { isInstanceOf } from "./is-instance-of.js";
import { isTypeOf } from "./is-type-of.js";
import { TYPE } from "./type-of.js";

/**
 * It will determine whether the provided `value` is a symbol or not.
 * @group Symbol
 * @since 1.0.0
 * @param value
 * @example
 * isSymbol("foo");
 * // => false
 * @example
 * isSymbol(Symbol());
 * // => true
 */
export function isSymbol(value: unknown): value is symbol {
  return isTypeOf(value, TYPE.SYMBOL) || isInstanceOf(value, Symbol);
}

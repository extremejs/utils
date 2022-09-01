import isInstanceOf from "./is-instance-of.js";
import typeOf from "./type-of.js";

/**
 * It will determine whether the provided `value` is a symbol or not.
 * @since 1.0.0
 * @param value
 * @example
 * isSymbol("foo");
 * // => false
 * @example
 * isSymbol(Symbol());
 * // => true
 */
export default function isSymbol(value: unknown): value is symbol {
  return typeOf(value) === "symbol" || isInstanceOf(value, Symbol);
}

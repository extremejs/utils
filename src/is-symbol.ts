import { isInstanceOf } from "./is-instance-of.js";
import { isTypeOf } from "./is-type-of.js";
import { TYPE } from "./type-of.js";

/**
 * Checks for a primitive symbol or an instance of the current realm's `Symbol` constructor.
 *
 * @group Symbol
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for a primitive symbol or a matching boxed value. The type guard narrows to
 * `symbol` even when the input is boxed.
 * @see {@link https://lodash.com/docs/4.18.1#isSymbol | Lodash isSymbol} as `_.isSymbol(value)`. Lodash also recognizes boxed symbols from other realms.
 * @example
 * isSymbol(Symbol("x")); // => true
 * isSymbol("x"); // => false
 */
export function isSymbol(value: unknown): value is symbol {
  return isTypeOf(value, TYPE.SYMBOL) || isInstanceOf(value, Symbol);
}

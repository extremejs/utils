import { tryReadBuiltin } from "./internal/builtin-brand.js";

/**
 * Checks for a primitive symbol or a genuine boxed `Symbol` across realms.
 *
 * @group Symbol
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for a primitive symbol or genuine boxed `Symbol`, including across realms.
 * @see {@link https://lodash.com/docs/4.18.1#isSymbol | Lodash isSymbol} as `_.isSymbol(value)`.
 * @example
 * isSymbol(Symbol("x")); // => true
 * isSymbol("x"); // => false
 */
// oxlint-disable-next-line typescript/no-wrapper-object-types -- This guard accepts both primitives and boxed objects.
export function isSymbol(value: unknown): value is symbol | Symbol {
  return typeof value === "symbol" || tryReadBuiltin(Symbol.prototype.valueOf, value) !== void 0;
}

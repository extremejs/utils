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
  return typeof value === "symbol" || value instanceof Symbol;
}

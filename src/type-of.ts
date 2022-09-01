/**
 * Returns the `typeof` result of `value`.
 * @since 1.0.0
 * @param value
 * @example
 * typeOf(1);
 * // => "number"
 */
export default function typeOf<Value>(value: Value): JSTypeT {
  return typeof value;
}

export type JSTypeT = "bigint" | "boolean" | "function" | "number" | "object" | "string" | "symbol" | "undefined";

import typeOf, { JSTypeT } from "./type-of.js";

/**
 * Checks if the `typeof` result of `value` is equal to the provided `type`.
 * @since 1.0.0
 * @param value
 * @param type
 * @example
 * isTypeOf(1, "number");
 * // => true
 */
export default function isTypeOf<Value>(value: Value, type: JSTypeT): boolean {
  return typeOf(value) === type;
}

export enum TYPE {
  BIGINT = "bigint",
  BOOLEAN = "boolean",
  FUNCTION = "function",
  NUMBER = "number",
  OBJECT = "object",
  STRING = "string",
  SYMBOL = "symbol",
  UNDEFINED = "undefined",
}

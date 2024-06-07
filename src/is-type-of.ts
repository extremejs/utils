import { type TYPE, typeOf } from "./type-of.js";

/**
 * Checks if the `typeof` result of `value` is equal to the provided `type`.
 * @group Other
 * @since 1.0.0
 * @param value
 * @param type
 * @example
 * isTypeOf(1, "number"); // => true
 */
export function isTypeOf<Value>(value: Value, type: TYPE): boolean {
  return typeOf(value) === type;
}

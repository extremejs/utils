import isInstanceOf from "./is-instance-of.js";
import typeOf from "./type-of.js";

/**
 * It will determine whether the provided `value` is a boolean or not.
 * @since 1.0.0
 * @param value
 * @example
 * isBoolean(false);
 * // => true
 * @example
 * isBoolean(3);
 * // => false
 */
export default function isBoolean(value: unknown): value is boolean {
  return typeOf(value) === "boolean" || isInstanceOf(value, Boolean);
}

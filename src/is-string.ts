import isInstanceOf from "./is-instance-of.js";
import typeOf from "./type-of.js";

/**
 * It will determine whether the provided `value` is a string or not.
 * @since 1.0.0
 * @param value
 * @example
 * isString("foo");
 * // => true
 * @example
 * isString(2);
 * // => false
 */
export default function isString(value: unknown): value is string {
  return typeOf(value) === "string" || isInstanceOf(value, String);
}

import isInstanceOf from "./is-instance-of.js";
import isTypeOf from "./is-type-of.js";
import { TYPE } from "./type-of.js";

/**
 * It will determine whether the provided `value` is a string or not.
 * @group String
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
  return isTypeOf(value, TYPE.STRING) || isInstanceOf(value, String);
}

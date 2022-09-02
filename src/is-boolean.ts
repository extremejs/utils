import isInstanceOf from "./is-instance-of.js";
import isTypeOf from "./is-type-of.js";
import { TYPE } from "./type-of.js";

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
  return isTypeOf(value, TYPE.BOOLEAN) || isInstanceOf(value, Boolean);
}

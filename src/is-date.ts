import { isInstanceOf } from "./is-instance-of.js";

/**
 * It will determine whether the provided `value` is a Date or not.
 * @group Date
 * @since 1.0.0
 * @param value
 * @example
 * isDate(new Date());
 * // => true
 * @example
 * isDate(2);
 * // => false
 */
export function isDate(value: unknown): value is Date {
  return isInstanceOf(value, Date);
}

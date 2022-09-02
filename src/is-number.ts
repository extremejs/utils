import isInstanceOf from "./is-instance-of.js";
import isTypeOf from "./is-type-of.js";
import { TYPE } from "./type-of.js";

/**
 * It will determine whether the provided `value` is a number or not.
 * @group Number
 * @since 1.0.0
 * @param value
 * @example
 * isNumber("foo");
 * // => false
 * @example
 * isNumber(2);
 * // => true
 */
export default function isNumber(value: unknown): value is number {
  return isTypeOf(value, TYPE.NUMBER) || isInstanceOf(value, Number);
}

import { type RecordT } from "./internals/index.js";
import { isInstanceOf } from "./is-instance-of.js";

/**
 * It will determine whether the provided `value` is an Object or not.
 * @group Object
 * @since 1.0.0
 * @param value
 * @example
 * isObject({}); // => true
 * @example
 * isObject([1, 2, 3]); // => true
 * @example
 * isObject(() => 0); // => true
 * @example
 * isObject(null); // => false
 */
export function isObject(value: unknown): value is RecordT {
  return isInstanceOf(value, Object);
}

import { RecordT } from "./get.js";

/**
 * It will determine whether the provided `value` is an Object or not.
 * @since 1.0.0
 * @param value
 * @example
 * isObject({});
 * // => true
 * @example
 * isObject([1, 2, 3]);
 * // => true
 * @example
 * isObject(() => 0);
 * // => true
 * @example
 * isObject(null);
 * // => false
 */
export default function isObject(value: unknown): value is RecordT {
  return value instanceof Object;
}

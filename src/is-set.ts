import { isInstanceOf } from "./is-instance-of.js";

/**
 * It will determine whether the provided `value` is a Set object or not.
 * @group Set
 * @since 1.0.0
 * @param value
 * @example
 * isSet(new Set); // => true
 * @example
 * isSet(new WeakSet); // => false
 */
export function isSet(value: unknown): value is Set<unknown> {
  return isInstanceOf(value, Set);
}

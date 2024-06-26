import { type RecordT } from "./constants/index.js";
import { isInstanceOf } from "./is-instance-of.js";

/**
 * It will determine whether the provided `value` is a WeakSet object or not.
 * @group Set
 * @since 1.0.0
 * @param value
 * @example
 * isWeakSet(new WeakSet); // => true
 * @example
 * isWeakSet(new Set); // => false
 */
export function isWeakSet(value: unknown): value is WeakSet<RecordT> {
  return isInstanceOf(value, WeakSet);
}

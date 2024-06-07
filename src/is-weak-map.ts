import { type RecordT } from "./internals/index.js";
import { isInstanceOf } from "./is-instance-of.js";

/**
 * It will determine whether the provided `value` is a WeakMap object or not.
 * @group Map
 * @since 1.0.0
 * @param value
 * @example
 * isWeakMap(new WeakMap); // => true
 * @example
 * isWeakMap(new Map); // => false
 */
export function isWeakMap(value: unknown): value is WeakMap<RecordT, unknown> {
  return isInstanceOf(value, WeakMap);
}

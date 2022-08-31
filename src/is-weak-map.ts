import { RecordT } from "./get.js";
import isInstanceOf from "./is-instance-of.js";

/**
 * It will determine whether the provided value is a WeakMap object or not.
 * @since 1.0.0
 * @param value
 * @example
 * isWeakMap(new WeakMap);
 * // => true
 * @example
 * isWeakMap(new Map);
 * // => false
 */
export default function isWeakMap(value: unknown): value is WeakMap<RecordT, unknown> {
  // TODO: Use "node:util" for node environment.
  return isInstanceOf(value, WeakMap);
}

import isInstanceOf from "./is-instance-of.js";

/**
 * It will determine whether the provided `value` is a Map object or not.
 * @group Map
 * @since 1.0.0
 * @param value
 * @example
 * isMap(new Map);
 * // => true
 * @example
 * isMap(new WeakMap);
 * // => false
 */
export default function isMap(value: unknown): value is Map<unknown, unknown> {
  // TODO: Use "node:util" for node environment.
  return isInstanceOf(value, Map);
}

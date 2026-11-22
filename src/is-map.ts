import { isInstanceOf } from "./is-instance-of.js";

/**
 * Checks whether a value is an instance of the current realm's `Map` constructor.
 *
 * @group Map
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` if the local `instanceof Map` check succeeds.
 * @see {@link https://lodash.com/docs/4.18.1#isMap | Lodash isMap} as `_.isMap(value)`. Lodash also recognizes maps from other realms.
 * @example
 * isMap(new Map()); // => true
 * isMap(new WeakMap()); // => false
 */
export function isMap(value: unknown): value is Map<unknown, unknown> {
  return isInstanceOf(value, Map);
}

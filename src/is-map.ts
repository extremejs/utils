import { mapSize } from "./internal/collection-size.js";

/**
 * Checks for a genuine `Map` across realms.
 *
 * @group Map
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for genuine `Map` values, including across realms.
 * @see {@link https://lodash.com/docs/4.18.1#isMap | Lodash isMap} as `_.isMap(value)`.
 * @example
 * isMap(new Map()); // => true
 * isMap(new WeakMap()); // => false
 */
export function isMap(value: unknown): value is Map<unknown, unknown> {
  return mapSize(value) !== void 0;
}

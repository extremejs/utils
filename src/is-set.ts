import { setSize } from "./internal/collection-size.js";

/**
 * Checks for a genuine `Set` across realms.
 *
 * @group Set
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for genuine `Set` values, including across realms.
 * @see {@link https://lodash.com/docs/4.18.1#isSet | Lodash isSet} as `_.isSet(value)`.
 * @example
 * isSet(new Set()); // => true
 * isSet(new WeakSet()); // => false
 */
export function isSet(value: unknown): value is Set<unknown> {
  return setSize(value) !== void 0;
}

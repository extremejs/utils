import { isInstanceOf } from "./is-instance-of.js";

/**
 * Checks whether a value is an instance of the current realm's `Set` constructor.
 *
 * @group Set
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` if the local `instanceof Set` check succeeds.
 * @see {@link https://lodash.com/docs/4.18.1#isSet | Lodash isSet} as `_.isSet(value)`. Lodash also recognizes sets from other realms.
 * @example
 * isSet(new Set()); // => true
 * isSet(new WeakSet()); // => false
 */
export function isSet(value: unknown): value is Set<unknown> {
  return isInstanceOf(value, Set);
}

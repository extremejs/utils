import { tryReadBuiltin } from "./internal/builtin-brand.js";

/**
 * Checks for a genuine `WeakSet` across realms.
 *
 * @group Set
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for genuine `WeakSet` values, including across realms.
 * @see {@link https://lodash.com/docs/4.18.1#isWeakSet | Lodash isWeakSet} as `_.isWeakSet(value)`.
 * @example
 * isWeakSet(new WeakSet()); // => true
 * isWeakSet(new Set()); // => false
 */
export function isWeakSet(value: unknown): value is WeakSet<WeakKey> {
  return tryReadBuiltin(WeakSet.prototype.has, value, Object.prototype) !== void 0;
}

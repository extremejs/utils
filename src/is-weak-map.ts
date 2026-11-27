import { tryReadBuiltin } from "./internal/builtin-brand.js";

/**
 * Checks for a genuine `WeakMap` across realms.
 *
 * @group Map
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for genuine `WeakMap` values, including across realms.
 * @see {@link https://lodash.com/docs/4.18.1#isWeakMap | Lodash isWeakMap} as `_.isWeakMap(value)`.
 * @example
 * isWeakMap(new WeakMap()); // => true
 * isWeakMap(new Map()); // => false
 */
export function isWeakMap(value: unknown): value is WeakMap<WeakKey, unknown> {
  return tryReadBuiltin(WeakMap.prototype.has, value, Object.prototype) !== void 0;
}

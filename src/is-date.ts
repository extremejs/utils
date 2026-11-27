import { tryReadBuiltin } from "./internal/builtin-brand.js";

/**
 * Checks for a genuine `Date` across realms.
 *
 * @group Date
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for genuine `Date` values, including across realms.
 * @see {@link https://lodash.com/docs/4.18.1#isDate | Lodash isDate} as `_.isDate(value)`.
 * @example
 * isDate(new Date(0)); // => true
 * isDate(0); // => false
 */
export function isDate(value: unknown): value is Date {
  return tryReadBuiltin(Date.prototype.getTime, value) !== void 0;
}

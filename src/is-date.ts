import { isInstanceOf } from "./is-instance-of.js";

/**
 * Checks whether a value is an instance of the current realm's `Date` constructor.
 *
 * @group Date
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` if the local `instanceof Date` check succeeds, including for invalid dates.
 * @see {@link https://lodash.com/docs/4.18.1#isDate | Lodash isDate} as `_.isDate(value)`. Lodash also recognizes dates from other realms.
 * @example
 * isDate(new Date(0)); // => true
 * isDate(0); // => false
 */
export function isDate(value: unknown): value is Date {
  return isInstanceOf(value, Date);
}

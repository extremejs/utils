import { isInstanceOf } from "./is-instance-of.js";

/**
 * Checks whether a value is an instance of the current realm's `RegExp` constructor.
 *
 * @group RegExp
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` if the local `instanceof RegExp` check succeeds.
 * @see {@link https://lodash.com/docs/4.18.1#isRegExp | Lodash isRegExp} as `_.isRegExp(value)`. Lodash also recognizes regular expressions from other realms.
 * @example
 * isRegExp(/abc/); // => true
 * isRegExp("/abc/"); // => false
 */
export function isRegExp(value: unknown): value is RegExp {
  return isInstanceOf(value, RegExp);
}

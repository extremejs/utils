import { builtinGetter, tryReadBuiltin } from "./internal/builtin-brand.js";

const getGlobal = builtinGetter<boolean | undefined>(RegExp.prototype, "global");

/**
 * Checks for a genuine `RegExp` across realms.
 *
 * @group RegExp
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for genuine `RegExp` values, including across realms.
 * @see {@link https://lodash.com/docs/4.18.1#isRegExp | Lodash isRegExp} as `_.isRegExp(value)`.
 * @example
 * isRegExp(/abc/); // => true
 * isRegExp("/abc/"); // => false
 */
export function isRegExp(value: unknown): value is RegExp {
  return tryReadBuiltin(getGlobal, value) !== void 0;
}

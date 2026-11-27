import { tryReadBuiltin } from "./internal/builtin-brand.js";

/**
 * Checks for a primitive string or a genuine boxed `String` across realms.
 *
 * @group String
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for a primitive string or genuine boxed `String`, including across realms.
 * @see {@link https://lodash.com/docs/4.18.1#isString | Lodash isString} as `_.isString(value)`.
 * @example
 * isString("foo"); // => true
 * @example
 * isString(2); // => false
 */
// oxlint-disable-next-line typescript/no-wrapper-object-types -- This guard accepts both primitives and boxed objects.
export function isString(value: unknown): value is string | String {
  return typeof value === "string" || tryReadBuiltin(String.prototype.valueOf, value) !== void 0;
}

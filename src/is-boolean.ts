import { tryReadBuiltin } from "./internal/builtin-brand.js";

/**
 * Checks for a primitive boolean or a genuine boxed `Boolean` across realms.
 *
 * @group Boolean
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for a primitive boolean or genuine boxed `Boolean`, including across realms.
 * @see {@link https://lodash.com/docs/4.18.1#isBoolean | Lodash isBoolean} as `_.isBoolean(value)`.
 * @example
 * isBoolean(false); // => true
 * isBoolean(0); // => false
 */
// oxlint-disable-next-line typescript/no-wrapper-object-types -- This guard accepts both primitives and boxed objects.
export function isBoolean(value: unknown): value is boolean | Boolean {
  return typeof value === "boolean" || tryReadBuiltin(Boolean.prototype.valueOf, value) !== void 0;
}

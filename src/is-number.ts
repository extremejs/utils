import { tryReadBuiltin } from "./internal/builtin-brand.js";

/**
 * Checks for a primitive number or a genuine boxed `Number` across realms.
 *
 * @group Number
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for a primitive number or genuine boxed `Number`, including across realms.
 * @see {@link https://lodash.com/docs/4.18.1#isNumber | Lodash isNumber} as `_.isNumber(value)`.
 * @example
 * isNumber(Number.NaN); // => true
 * isNumber(Object(2)); // => true
 * isNumber("2"); // => false
 */
// oxlint-disable-next-line typescript/no-wrapper-object-types -- This guard accepts both primitives and boxed objects.
export function isNumber(value: unknown): value is number | Number {
  return typeof value === "number" || tryReadBuiltin(Number.prototype.valueOf, value) !== void 0;
}

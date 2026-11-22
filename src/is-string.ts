import { isInstanceOf } from "./is-instance-of.js";
import { isTypeOf } from "./is-type-of.js";
import { TYPE } from "./type-of.js";

/**
 * Checks for a primitive string or a value that passes the current realm's `instanceof String` check.
 *
 * @group String
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for a primitive string or a matching String instance.
 * The type guard narrows to `string` even when the value is boxed.
 * @see {@link https://lodash.com/docs/4.18.1#isString | Lodash isString} as `_.isString(value)`. Lodash also recognizes boxed strings from other realms.
 * @example
 * isString("foo"); // => true
 * @example
 * isString(2); // => false
 */
export function isString(value: unknown): value is string {
  return isTypeOf(value, TYPE.STRING) || isInstanceOf(value, String);
}

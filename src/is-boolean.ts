import { isInstanceOf } from "./is-instance-of.js";
import { isTypeOf } from "./is-type-of.js";
import { TYPE } from "./type-of.js";

/**
 * Checks for a primitive boolean or an instance of the current realm's `Boolean` constructor.
 *
 * @group Boolean
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for a primitive boolean or a matching boxed value. The type guard narrows to
 * `boolean` even when the input is boxed.
 * @see {@link https://lodash.com/docs/4.18.1#isBoolean | Lodash isBoolean} as `_.isBoolean(value)`. Lodash also recognizes boxed booleans from other realms.
 * @example
 * isBoolean(false); // => true
 * isBoolean(0); // => false
 */
export function isBoolean(value: unknown): value is boolean {
  return isTypeOf(value, TYPE.BOOLEAN) || isInstanceOf(value, Boolean);
}

import { isInstanceOf } from "./is-instance-of.js";
import { isTypeOf } from "./is-type-of.js";
import { TYPE } from "./type-of.js";

/**
 * Checks for a primitive number or an instance of the current realm's `Number` constructor.
 *
 * @group Number
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for a primitive number or a matching boxed value. The type guard narrows to
 * `number` even when the input is boxed. Primitive infinities and `NaN` also pass.
 * @see {@link https://lodash.com/docs/4.18.1#isNumber | Lodash isNumber} as `_.isNumber(value)`. Lodash also recognizes boxed numbers from other realms.
 * @example
 * isNumber(Number.NaN); // => true
 * isNumber(Object(2)); // => true
 * isNumber("2"); // => false
 */
export function isNumber(value: unknown): value is number {
  return isTypeOf(value, TYPE.NUMBER) || isInstanceOf(value, Number);
}

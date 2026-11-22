import { type RecordT, OBJECT_CONSTRUCTOR } from "./constants/index.js";
import { isInstanceOf } from "./is-instance-of.js";

/**
 * Checks whether a value is an instance of the current realm's `Object` constructor.
 *
 * @group Object
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for matching objects, including arrays, boxed primitives, and functions.
 * Nullish values and primitives return `false`.
 * @see {@link https://lodash.com/docs/4.18.1#isObject | Lodash isObject} as `_.isObject(value)`. Lodash also accepts null-prototype objects and objects and functions from other realms.
 * @example
 * isObject([]); // => true
 * isObject(() => 0); // => true
 * isObject(Object.create(null)); // => false
 */
export function isObject(value: unknown): value is RecordT {
  return isInstanceOf(value, OBJECT_CONSTRUCTOR);
}

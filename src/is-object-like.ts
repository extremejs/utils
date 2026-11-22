import { type RecordT } from "./constants/index.js";
import { isNil } from "./is-nil.js";
import { isTypeOf } from "./is-type-of.js";
import { TYPE } from "./type-of.js";

/**
 * Checks whether a value is non-nullish and its `typeof` result is `object`.
 *
 * @group Object
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for objects, including arrays, boxed primitives, and null-prototype
 * objects from any realm. Functions and primitives return `false`.
 * @see {@link https://lodash.com/docs/4.18.1#isObjectLike | Lodash isObjectLike} as `_.isObjectLike(value)`.
 * @example
 * isObjectLike([]); // => true
 * isObjectLike(() => 0); // => false
 * isObjectLike(Object.create(null)); // => true
 */
export function isObjectLike(value: unknown): value is RecordT {
  return !isNil(value) && isTypeOf(value, TYPE.OBJECT);
}

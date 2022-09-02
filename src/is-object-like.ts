import { RecordT } from "./get.js";
import isNil from "./is-nil.js";
import isTypeOf from "./is-type-of.js";
import { TYPE } from "./type-of.js";

/**
 * Checks if `value` is object-like.
 * A value is object-like if it's not `null`/`undefined` and has a `typeof` result of `object`.
 * @group Object
 * @since 1.0.0
 * @param value
 * @example
 * isObjectLike({});
 * // => true
 * @example
 * isObjectLike([1, 2, 3]);
 * // => true
 * @example
 * isObjectLike(() => 0);
 * // => false
 * @example
 * isObjectLike(null);
 * // => false
 */
export default function isObjectLike(value: unknown): value is RecordT {
  return !isNil(value) && isTypeOf(value, TYPE.OBJECT);
}

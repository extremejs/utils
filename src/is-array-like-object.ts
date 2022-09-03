import isArrayLike from "./is-array-like.js";
import { FunctionT } from "./is-function.js";
import isObjectLike from "./is-object-like.js";

/**
 * This method is similar to `isArrayLike`,
 * with the only difference of checking whether `value` is also an object.
 * @group Array
 * @since 1.0.0
 * @param value
 * @example
 * isArrayLikeObject([1, 2, 3]);
 * // => true
 * @example
 * isArrayLikeObject(document.body.children);
 * // => true
 * @example
 * isArrayLikeObject("abc");
 * // => false
 * @example
 * isArrayLikeObject(() => 0);
 * // => false
 */
export default function isArrayLikeObject<Value>(value: Value): Value extends FunctionT
  ? false
  : Value extends { length: number }
    ? true
    : false {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (isObjectLike(value) && isArrayLike(value)) as any;
}

import isFunction, { FunctionT } from "./is-function.js";
import isLength from "./is-length.js";

/**
 * Checks if `value` is array-like.
 * A value is considered array-like if it's not a `function`
 * and has a `value.length` that's an integer greater than or equal to `0`
 * and less than or equal to `Number.MAX_SAFE_INTEGER`.
 * @group Array
 * @since 1.0.0
 * @param value
 * @example
 * isArrayLike([1, 2, 3]);
 * // => true
 * @example
 * isArrayLike(document.body.children);
 * // => true
 * @example
 * isArrayLike("abc");
 * // => true
 * @example
 * isArrayLike(() => 0);
 * // => false
 */
export default function isArrayLike<Value>(value: Value): Value extends FunctionT
  ? false
  : Value extends { length: number }
    ? true
    : unknown extends Value
      ? boolean
      : false {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (isLength((value as any)?.length) && !isFunction(value)) as any;
}

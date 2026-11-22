import { isArrayLike } from "./is-array-like.js";
import { type FunctionT } from "./is-function.js";
import { isObjectLike } from "./is-object-like.js";

/**
 * Checks whether a non-null object has a valid array-like length.
 *
 * Length must be a primitive integer from zero through `Number.MAX_SAFE_INTEGER`.
 * Reading `length` can invoke a getter or proxy trap.
 *
 * @group Array
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for array-like objects, including arrays, indexed records, and boxed strings.
 * Primitive strings and functions return `false`.
 * @see {@link https://lodash.com/docs/4.18.1#isArrayLikeObject | Lodash isArrayLikeObject} as `_.isArrayLikeObject(value)`. Lodash uses function tags where ExtremeJS uses `typeof`.
 * @example
 * isArrayLikeObject({ length: 0 }); // => true
 * isArrayLikeObject("abc"); // => false
 * isArrayLikeObject({ length: -1 }); // => false
 */
export function isArrayLikeObject<Value>(value: Value): Value extends FunctionT
  ? false
  : Value extends { length: number; }
    ? true
    : false {
  // Preserve the conditional generic result.
  // oxlint-disable-next-line typescript/no-explicit-any typescript/no-unsafe-type-assertion
  return (isObjectLike(value) && isArrayLike(value)) as any;
}

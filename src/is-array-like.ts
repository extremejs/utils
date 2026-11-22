import { type FunctionT, isFunction } from "./is-function.js";
import { isLength } from "./is-length.js";

/**
 * Checks whether a value has a valid array-like length and is not a function.
 *
 * Length must be a primitive integer from zero through `Number.MAX_SAFE_INTEGER`.
 * Reading `length` can invoke a getter or proxy trap.
 *
 * @group Array
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for a non-function with a valid `length`, including primitive strings,
 * arrays, and objects with a length but no indexed properties.
 * @see {@link https://lodash.com/docs/4.18.1#isArrayLike | Lodash isArrayLike} as `_.isArrayLike(value)`. Lodash uses function tags where ExtremeJS uses `typeof`.
 * @example
 * isArrayLike({ length: 0 }); // => true
 * isArrayLike("abc"); // => true
 * isArrayLike({ length: -1 }); // => false
 */
export function isArrayLike<Value>(value: Value): Value extends FunctionT
  ? false
  : Value extends { length: number; }
    ? true
    : unknown extends Value
      ? boolean
      : false {
  // Preserve the conditional generic result.
  // oxlint-disable-next-line typescript/no-explicit-any typescript/no-unsafe-type-assertion
  return (isLength((value as any)?.length) && !isFunction(value)) as any;
}

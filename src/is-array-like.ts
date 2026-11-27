import { type ArrayLikeObjectT } from "./is-array-like-object.js";
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
export function isArrayLike(value: unknown): value is string | ArrayLikeObjectT {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Property access boxes primitives.
  const length = (value as { readonly length?: unknown; } | null | undefined)?.length;
  return isLength(length) && typeof value !== "function";
}

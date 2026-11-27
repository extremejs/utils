import { type SliceT, slice } from "./slice.js";

/**
 * Removes a prefix by slicing from index `n`. Array results are shallow
 * copies that preserve holes. Strings are sliced by UTF-16 code unit.
 *
 * @group Collection
 * @since 1.0.0
 * @param value The array or string to slice.
 * @param n A nonnegative integer count. Defaults to `1`. The caller is responsible for validation.
 * @returns The suffix as an array of the input's element type or a string.
 * A count at or beyond the length returns an empty result.
 * @see {@link https://lodash.com/docs/4.18.1#drop | Lodash drop} as `_.drop(array, n)` for dense arrays and nonnegative integer counts. Lodash fills holes with `undefined` and returns an array for string input.
 * @example
 * drop([0, 1, 2, 3, 4, 5], 2); // => [2, 3, 4, 5]
 * @example
 * drop("012345"); // => "12345"
 * @example
 * drop("012345", 2); // => "2345"
 */
export function drop<Value extends unknown[] | string>(value: Value, n = 1): SliceT<Value> {
  return slice(value, n);
}

import { isArray } from "./is-array.js";
import { type SliceT, slice } from "./slice.js";

/**
 * Drops a suffix by slicing up to `value.length - n`. Array results are
 * shallow copies that preserve holes. Strings are sliced by UTF-16 code unit.
 *
 * @group Collection
 * @since 1.0.0
 * @param value The array or string to slice.
 * @param n A nonnegative integer count. Defaults to `1`. The caller is responsible for validation.
 * @returns The prefix as an array of the input's element type or a string.
 * A count at or beyond the length returns an empty result.
 * @see {@link https://lodash.com/docs/4.18.1#dropRight | Lodash dropRight} as `_.dropRight(array, n)` for dense arrays and nonnegative integer counts. Lodash fills holes with `undefined` and returns an array for string input.
 * @example
 * dropRight([0, 1, 2, 3, 4, 5], 2); // => [0, 1, 2, 3]
 * @example
 * dropRight("012345"); // => "01234"
 * @example
 * dropRight("012345", 2); // => "0123"
 */
export function dropRight<Value extends unknown[] | string>(value: Value, n = 1): SliceT<Value> {
  const length = value.length;

  if (n >= length) {
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- An empty result has the input kind.
    return (isArray(value) ? [] : "") as SliceT<Value>;
  }

  return slice(value, 0, length - n);
}

import { isArray } from "./is-array.js";
import { slice } from "./slice.js";

/**
 * Drops a suffix by slicing up to `value.length - n`. Array results are
 * shallow copies that preserve holes. Strings are sliced by UTF-16 code unit.
 *
 * @group Collection
 * @since 1.0.0
 * @param value The array or string to slice.
 * @param n The number of trailing elements or code units to drop. Defaults to `1`.
 * Use an integer count. For fractional counts the resulting end index is truncated by native slicing.
 * @returns The prefix as an array or string. A count at or beyond the length returns an empty result.
 * @see {@link https://lodash.com/docs/4.18.1#dropRight | Lodash dropRight} as `_.dropRight(array, n)` for dense arrays and integer counts. Lodash truncates the count before computing the end, fills holes with `undefined`, and returns an array for string input.
 * @example
 * dropRight([0, 1, 2, 3, 4, 5], 2); // => [0, 1, 2, 3]
 * @example
 * dropRight("012345"); // => "01234"
 * @example
 * dropRight("012345", 2); // => "0123"
 */
export function dropRight<Value extends unknown[] | string>(value: Value, n = 1): Value {
  const length = value.length;

  if (n >= length) {
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Preserve the existing generic return type.
    if (isArray(value)) return [] as never;

    // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Preserve the existing generic return type.
    return "" as never;
  }

  return slice(value, 0, length - n);
}

import { slice } from "./slice.js";

/**
 * Splits an array into consecutive groups of up to `size` elements.
 * The final group can be shorter. Each group is a shallow copy that preserves
 * sparse holes. Lodash fills those holes with `undefined`.
 *
 * @group Array
 * @since 1.0.0
 * @param array The array to split.
 * @param size A positive integer group size. Defaults to `1`. The caller is responsible for validation.
 * @returns A new array of groups, or an empty array for empty input with a valid size.
 * @see {@link https://lodash.com/docs/4.18.1#chunk | Lodash chunk} as `_.chunk(array, size)` for positive integer sizes.
 * @example
 * chunk([1, 2, 3]); // => [[1], [2], [3]]
 * @example
 * chunk([1, 2, 3, 4, 5], 2); // => [[1, 2], [3, 4], [5]]
 */
export function chunk<Value>(array: Value[], size = 1): Value[][] {
  return Array.from(
    { length: Math.ceil(array.length / size) },
    (value, index) => {
      const start = index * size;

      return slice(array, start, start + size);
    },
  );
}

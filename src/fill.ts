/**
 * Fills a range in a mutable array in place using native array filling.
 * The start is inclusive and the end is exclusive. Negative indices are
 * relative to the end, and holes inside the range are written too.
 *
 * @group Array
 * @since 1.0.0
 * @param array The mutable array to fill.
 * @param value The value assigned to each position in the range.
 * @param start The starting index. Defaults to `0`.
 * @param end The exclusive end index. Defaults to the array length.
 * @returns The same array, including when empty.
 * @see {@link https://lodash.com/docs/4.18.1#fill | Lodash fill} as `_.fill(array, value, start, end)`. Lodash returns a new empty array for empty input.
 * @example
 * fill([1, 2, 3], 0); // => [0, 0, 0]
 * @example
 * fill([1, 2, 3], 0, 1); // => [1, 0, 0]
 * @example
 * fill([1, 2, 3], 0, 1, 2); // => [1, 0, 3]
 */
// oxlint-disable-next-line max-params
export function fill<Value>(array: Value[], value: Value, start = 0, end = array.length): Value[] {
  return array.fill(value, start, end);
}

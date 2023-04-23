/**
 * Fills elements of `array` with value from `start` up to, but not including, `end`.
 * @group Array
 * @since 1.0.0
 * @param array The array to fill.
 * @param value The value to fill `array` with.
 * @param start The start position.
 * @param end The end position.
 * @example
 * fill([1, 2, 3], 0); // => [0, 0, 0]
 * @example
 * fill([1, 2, 3], 0, 1); // => [1, 0, 0]
 * @example
 * fill([1, 2, 3], 0, 1, 2); // => [1, 0, 3]
 */
// eslint-disable-next-line max-params
export function fill<Value>(array: Value[], value: Value, start = 0, end = array.length): Value[] {
  return array.fill(value, start, end);
}

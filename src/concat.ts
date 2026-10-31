/**
 * It will create a new array concatenating the input `array` with any additional arrays and/or values.
 * @group Array
 * @since 1.0.0
 * @param array
 * @param items
 * @example
 * concat([1, 2], 3, [4], [[5]]); // => [1, 2, 3, 4, [5]]
 */
export function concat<Value>(array: Value[], ...items: Array<ConcatArray<Value> | Value>): Value[] {
  // oxlint-disable-next-line unicorn/prefer-spread -- Preserve concat flattening and sparse array behavior.
  return array.concat(...items);
}

/**
 * It will create a new array concatenating the input `array` with any additional arrays and/or values.
 * @since 1.0.0
 * @param array
 * @param items
 * @example
 * concat([1, 2], 3, [4], [[5]]);
 * // => [1, 2, 3, 4, [5]]
 */
export default function concat<Value>(array: Value[], ...items: Array<ConcatArray<Value> | Value>): Value[] {
  return array.concat(...items);
}

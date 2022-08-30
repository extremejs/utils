/**
 * It will create a slice of the `value` (array/string) from `start`, up to, but not including, `end`.
 * @since 1.0.0
 * @param value
 * @param [start=0]
 * @param [end=value.length]
 * @example
 * slice([0, 1, 2, 3, 4, 5], 2);
 * // => [2, 3, 4, 5]
 * @example
 * slice([0, 1, 2, 3, 4, 5], 2, 5);
 * // => [2, 3, 4]
 * @example
 * slice("012345");
 * // => "012345"
 * @example
 * slice("012345", 2, 4);
 * // => "23"
 */
export default function slice<Value extends unknown[] | string>(value: Value, start?: number, end?: number): Value {
  return value.slice(start, end) as Value;
}

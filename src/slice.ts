/**
 * It will create a slice of the `value` (array/string) from `start`, up to, but not including, `end`.
 * @group Collection
 * @since 1.0.0
 * @param value
 * @param start
 * @param end
 * @example
 * slice([0, 1, 2, 3, 4, 5], 2); // => [2, 3, 4, 5]
 * @example
 * slice([0, 1, 2, 3, 4, 5], 2, 5); // => [2, 3, 4]
 * @example
 * slice("012345"); // => "012345"
 * @example
 * slice("012345", 2, 4); // => "23"
 */
export function slice<Value extends unknown[] | string>(value: Value, start = 0, end = value.length): Value {
  return value.slice(start, end) as Value;
}

import { slice } from "./slice.js";

/**
 * It will create a slice of `value` (array/string) with `n` elements dropped from the beginning.
 * @group Collection
 * @since 1.0.0
 * @param value
 * @param [n=1]
 * @example
 * drop([0, 1, 2, 3, 4, 5], 2);
 * // => [2, 3, 4, 5]
 * @example
 * drop("012345");
 * // => "12345"
 * @example
 * drop("012345", 2);
 * // => "2345"
 */
export function drop<Value extends unknown[] | string>(value: Value, n = 1): Value {
  return slice(value, n);
}

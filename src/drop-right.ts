import isArray from "./is-array.js";
import slice from "./slice.js";

/**
 * It will create a slice of `value` (array/string) with `n` elements dropped from the end.
 * @group Collection
 * @since 1.0.0
 * @param value
 * @param [n=1]
 * @example
 * drop([0, 1, 2, 3, 4, 5], 2);
 * // => [0, 1, 2, 3]
 * @example
 * drop("012345");
 * // => "01234"
 * @example
 * drop("012345", 2);
 * // => "0123"
 */
export default function dropRight<Value extends unknown[] | string>(value: Value, n = 1): Value {
  const length = value.length;

  if (n >= length) {
    if (isArray(value)) return [] as never;

    return "" as never;
  }

  return slice(value, 0, length - n);
}

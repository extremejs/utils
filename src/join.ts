/**
 * It will convert all elements in the `array` into a string separated by the `separator`.
 * @group Array
 * @since 1.0.0
 * @param array
 * @param [separator=""]
 * @example
 * join([1, 2, 3]);
 * // => "123"
 * @example
 * join([1, 2, 3], ",");
 * // => "1,2,3"
 */
export default function join(array: unknown[], separator = ""): string {
  return array.join(separator);
}

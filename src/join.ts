/**
 * Joins the array elements into a string using native array joining.
 * Holes, `null`, and `undefined` contribute empty fields. A value that
 * cannot be converted to a string, such as a symbol, throws a `TypeError`.
 *
 * @group Array
 * @since 1.0.0
 * @param array The array to join.
 * @param separator The string to insert between elements. Defaults to the empty string.
 * @returns The joined string, or an empty string for an empty array.
 * @see {@link https://lodash.com/docs/4.18.1#join | Lodash join} as `_.join(array, separator)`. Pass `""` explicitly to Lodash to match this utility's default.
 * @example
 * join([1, 2, 3]); // => "123"
 * @example
 * join([1, 2, 3], ","); // => "1,2,3"
 */
export function join(array: unknown[], separator = ""): string {
  return array.join(separator);
}

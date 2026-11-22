/**
 * Checks whether a value is an array using `Array.isArray`.
 *
 * @group Array
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for arrays, including sparse and cross-realm arrays.
 * Array-like objects and typed arrays return `false`.
 * @see {@link https://lodash.com/docs/4.18.1#isArray | Lodash isArray} as `_.isArray(value)`.
 * @example
 * isArray([1]); // => true
 * isArray({ 0: 1, length: 1 }); // => false
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

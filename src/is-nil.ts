/**
 * Checks whether a value is nullish.
 *
 * @group Other
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for `null` or `undefined`.
 * @see {@link https://lodash.com/docs/4.18.1#isNil | Lodash isNil} as `_.isNil(value)`.
 * @example
 * isNil(null); // => true
 * isNil(""); // => false
 */
export function isNil(value: unknown): value is null | undefined {
  return value == null;
}

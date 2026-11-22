/**
 * Checks whether a value is strictly equal to `null`.
 *
 * @group Other
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` only for `null`.
 * @see {@link https://lodash.com/docs/4.18.1#isNull | Lodash isNull} as `_.isNull(value)`.
 * @example
 * isNull(null); // => true
 * isNull(undefined); // => false
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

/**
 * Checks whether a value is strictly equal to `undefined`.
 *
 * @group Other
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` only for `undefined`.
 * @see {@link https://lodash.com/docs/4.18.1#isUndefined | Lodash isUndefined} as `_.isUndefined(value)`.
 * @example
 * isUndefined(undefined); // => true
 * isUndefined(null); // => false
 */
export function isUndefined(value: unknown): value is undefined {
  // oxlint-disable-next-line no-undefined
  return value === undefined;
}

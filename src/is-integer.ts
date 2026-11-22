/**
 * Checks whether a value is a primitive number with no fractional part.
 *
 * @group Number
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for finite integers, including both signed zeros and integers outside
 * the safe integer range. Strings and boxed numbers return `false`.
 * @see {@link https://lodash.com/docs/4.18.1#isInteger | Lodash isInteger} as `_.isInteger(value)`.
 * @example
 * isInteger(2); // => true
 * isInteger(2.2); // => false
 */
export function isInteger(value: unknown): value is number {
  return Number.isInteger(value);
}

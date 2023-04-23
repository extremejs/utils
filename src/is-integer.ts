/**
 * It will determine whether the provided `value` is an integer or not.
 * @group Number
 * @since 1.0.0
 * @param value
 * @example
 * isInteger(2);
 * // => true
 * @example
 * isInteger(2.2);
 * // => false
 */
export function isInteger(value: unknown): value is number {
  return Number.isInteger(value);
}

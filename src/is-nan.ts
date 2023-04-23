/**
 * It will determine whether the provided `value` is NaN or not.
 * @group Number
 * @since 1.0.0
 * @param value
 * @example
 * isNaN(NaN);
 * // => true
 * @example
 * isNaN(2);
 * // => false
 * @example
 * isNaN(undefined);
 * // => false
 */
export function isNaN(value: unknown): boolean {
  return Number.isNaN(value);
}

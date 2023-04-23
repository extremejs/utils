/**
 * It will determine whether the provided `value` is an array or not.
 * @group Array
 * @since 1.0.0
 * @param value
 * @example
 * isArray([1]);
 * // => true
 * @example
 * isArray(3);
 * // => false
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

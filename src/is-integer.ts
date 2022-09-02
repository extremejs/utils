/**
 * It will determine whether the provided `value` is an integer or not.
 * @since 1.0.0
 * @param value
 * @example
 * isInteger(2);
 * // => true
 * @example
 * isInteger(2.2);
 * // => false
 */
export default function isInteger(value: unknown): boolean {
  return Number.isInteger(value);
}

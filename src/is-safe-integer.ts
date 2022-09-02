/**
 * It will determine whether the provided `value` is a safe integer or not.
 * @since 1.0.0
 * @param value
 * @example
 * isSafeInteger(2);
 * // => true
 * @example
 * isSafeInteger(Number.MIN_VALUE);
 * // => false
 */
export default function isSafeInteger(value: unknown): boolean {
  return Number.isSafeInteger(value);
}

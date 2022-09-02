/**
 * It will determine whether the provided `value` is a finite number or not.
 * @since 1.0.0
 * @param value
 * @example
 * isFinite(Infinity);
 * // => false
 * @example
 * isFinite(3);
 * // => true
 */
export default function isFinite(value: unknown): boolean {
  return Number.isFinite(value);
}

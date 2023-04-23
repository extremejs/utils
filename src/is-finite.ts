/**
 * It will determine whether the provided `value` is a finite number or not.
 * @group Number
 * @since 1.0.0
 * @param value
 * @example
 * isFinite(Infinity);
 * // => false
 * @example
 * isFinite(3);
 * // => true
 */
export function isFinite(value: unknown): value is number {
  return Number.isFinite(value);
}

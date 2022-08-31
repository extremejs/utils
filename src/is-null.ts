/**
 * It will determine whether the provided `value` is null or not.
 * @since 1.0.0
 * @param value
 * @example
 * isNull(null);
 * // => true
 * @example
 * isNull(undefined);
 * // => false
 * @example
 * isNull(void 0);
 * // => false
 */
export default function isNull(value: unknown): value is null {
  return value === null;
}

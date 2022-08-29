/**
 * It will determine whether the provided `value` is a boolean or not.
 * @since 1.0.0
 * @param value
 * @example
 * isBoolean(false);
 * // => true
 * @example
 * isBoolean(3);
 * // => false
 */
export default function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean" || value instanceof Boolean;
}

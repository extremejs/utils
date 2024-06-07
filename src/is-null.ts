/**
 * It will determine whether the provided `value` is null or not.
 * @group Other
 * @since 1.0.0
 * @param value
 * @example
 * isNull(null); // => true
 * @example
 * isNull(undefined); // => false
 * @example
 * isNull(void 0); // => false
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

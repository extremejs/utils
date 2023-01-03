/**
 * It will determine whether the provided `value` is null/undefined or not.
 * @group Other
 * @since 1.0.0
 * @param value
 * @example
 * isNull(null);
 * // => true
 * @example
 * isNil(undefined);
 * // => true
 * @example
 * isNil(void 0);
 * // => true
 */
export default function isNil(value: unknown): value is null | undefined {
  return value == null;
}

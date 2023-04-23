/**
 * It will determine whether the provided `value` is undefined or not.
 * @group Other
 * @since 1.0.0
 * @param value
 * @example
 * isUndefined(undefined);
 * // => true
 * @example
 * isUndefined(void 0);
 * // => true
 * @example
 * isUndefined(null);
 * // => false
 */
export function isUndefined(value: unknown): value is undefined {
  // eslint-disable-next-line no-undefined
  return value === undefined;
}

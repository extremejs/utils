/**
 * It will determine whether the provided `value` is null/undefined or not.
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
export default function isNil<Value>(value: Value): Value extends null | undefined ? true : false {
  return (value == null) as never;
}
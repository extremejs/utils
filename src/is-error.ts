/**
 * It will determine whether the provided `value` is an Error or not.
 * @since 1.0.0
 * @param value
 * @example
 * isError(new Error("error"));
 * // => true
 * @example
 * isError(new RangeError("error"));
 * // => true
 * @example
 * isError(2);
 * // => false
 */
export default function isError(value: unknown): value is Error {
  // TODO: Use "node:util" for node environment.
  return value instanceof Error;
}

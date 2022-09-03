/**
 * Converts `value` to a string using `Object.prototype.toString`.
 * @group Other
 * @since 1.0.0
 * @param value
 * @example
 * objectToString({});
 * // => "[object Object]"
 * @example
 * objectToString(2);
 * // => "[object Number]"
 */
export default function objectToString(value: unknown): string {
  return Object.prototype.toString.call(value);
}

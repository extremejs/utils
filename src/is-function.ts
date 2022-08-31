/**
 * It will determine whether the provided `value` is a function or not.
 * @since 1.0.0
 * @param value
 * @example
 * isFunction(() => 0);
 * // => true
 * @example
 * isFunction(2);
 * // => false
 */
export default function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === "function";
}

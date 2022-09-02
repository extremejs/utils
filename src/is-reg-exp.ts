import isInstanceOf from "./is-instance-of.js";

/**
 * It will determine whether the provided `value` is a RegExp object or not.
 * @group RegExp
 * @since 1.0.0
 * @param value
 * @example
 * isRegExp(/abc/);
 * // => true
 * @example
 * isRegExp(2);
 * // => false
 */
export default function isRegExp(value: unknown): value is RegExp {
  // TODO: Use "node:util" for node environment.
  return isInstanceOf(value, RegExp);
}

/**
 * It will determine whether the provided `value` is a Set object or not.
 * @since 1.0.0
 * @param value
 * @example
 * isSet(new Set);
 * // => true
 * @example
 * isSet(new WeakSet);
 * // => false
 */
export default function isSet(value: unknown): value is Set<unknown> {
  // TODO: Use "node:util" for node environment.
  return value instanceof Set;
}

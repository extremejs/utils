/**
 * Returns the `Object.getPrototypeOf` result of `value`.
 * @group Other
 * @since 1.0.0
 * @param value
 * @example
 * prototypeOf(Object.create(null));
 * // => null
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function prototypeOf(value: unknown): any {
  return Object.getPrototypeOf(value);
}

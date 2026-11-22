/**
 * Returns the supplied value unchanged. Objects are returned by reference.
 * @group Other
 * @since 1.0.0
 * @param value Any value, including `null` or `undefined`.
 * @returns The original value with its inferred type.
 * @see {@link https://lodash.com/docs/4.18.1#identity | Lodash identity} as `_.identity(value)`. Pass `undefined` explicitly to match Lodash's zero-argument call.
 * @example
 * const foo = { bar: "baz" };
 *
 * console.log(identity(foo) === foo); // true
 */
export function identity<Value>(value: Value): Value {
  return value;
}

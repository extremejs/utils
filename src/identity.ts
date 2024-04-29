/**
 * This method returns the first argument it receives.
 * @group Other
 * @since 1.0.0
 * @param value Any value
 * @returns The `value`.
 * @example
 * const foo = { bar: "baz" };
 *
 * console.log(identity(foo) === foo); // true
 */
export function identity<Value>(value: Value): Value {
  return value;
}

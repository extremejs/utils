/**
 * Converts the whole string to uppercase using JavaScript's default Unicode case mapping.
 * Spaces and punctuation are preserved.
 *
 * @group String
 * @since 1.0.0
 * @param string The source string.
 * @returns The uppercase string.
 * @see {@link https://lodash.com/docs/4.18.1#toUpper | Lodash toUpper} as `_.toUpper(string)`. The similarly named `_.upperCase(string)` rebuilds the string as space-separated words.
 * @example
 * upperCase("--fooBar--"); // => "--FOOBAR--"
 */
export function upperCase<Value extends string>(string: Value): Uppercase<Value> {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Preserve the existing generic return type.
  return string.toUpperCase() as Uppercase<Value>;
}

/**
 * Converts the whole string to lowercase using JavaScript's default Unicode case mapping.
 * Spaces and punctuation are preserved.
 *
 * @group String
 * @since 1.0.0
 * @param string The source string.
 * @returns The lowercase string.
 * @see {@link https://lodash.com/docs/4.18.1#toLower | Lodash toLower} as `_.toLower(string)`. The similarly named `_.lowerCase(string)` rebuilds the string as space-separated words.
 * @example
 * lowerCase("--FooBar--"); // => "--foobar--"
 */
export function lowerCase<Value extends string>(string: Value): Lowercase<Value> {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Preserve the existing generic return type.
  return string.toLowerCase() as Lowercase<Value>;
}

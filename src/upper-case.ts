/**
 * It will convert the given `string` to uppercase.
 * @group String
 * @since 1.0.0
 * @param string
 * @example
 * upperCase("--foo-bar--"); // => "--FOO-BAR--"
 * @example
 * upperCase("fooBar"); // => "FOOBAR"
 * @example
 * upperCase("__foo_bar__"); // => "__FOO_BAR__"
 */
export function upperCase<Value extends string>(string: Value): Uppercase<Value> {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Preserve the existing generic return type.
  return string.toUpperCase() as Uppercase<Value>;
}

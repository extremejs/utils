/**
 * It will convert the given `string` to uppercase.
 * @since 1.0.0
 * @param string
 * @example
 * upperCase("--foo-bar--");
 * // => "--FOO-BAR--"
 * @example
 * upperCase("fooBar");
 * // => "FOOBAR"
 * @example
 * upperCase("__foo_bar__");
 * // => "__FOO_BAR__"
 */
export default function upperCase<Value extends string>(string: Value): Uppercase<Value> {
  return string.toUpperCase() as Uppercase<Value>;
}

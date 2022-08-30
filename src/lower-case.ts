/**
 * It will convert the given string to lowercase.
 * @since 1.0.0
 * @param string
 * @example
 * lowerCase("--Foo-Bar--");
 * // => "--foo-bar--"
 * @example
 * lowerCase("fooBar");
 * // => "foobar"
 * @example
 * lowerCase("__FOO_BAR__");
 * // => "__foo_bar__"
 */
export default function lowerCase<Value extends string>(string: Value): Lowercase<Value> {
  return string.toLowerCase() as Lowercase<Value>;
}

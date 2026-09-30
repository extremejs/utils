/**
 * It will convert the given `string` to lowercase.
 * @group String
 * @since 1.0.0
 * @param string
 * @example
 * lowerCase("--Foo-Bar--"); // => "--foo-bar--"
 * @example
 * lowerCase("fooBar"); // => "foobar"
 * @example
 * lowerCase("__FOO_BAR__"); // => "__foo_bar__"
 */
export function lowerCase<Value extends string>(string: Value): Lowercase<Value> {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Preserve the existing generic return type.
  return string.toLowerCase() as Lowercase<Value>;
}

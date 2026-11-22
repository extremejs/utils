/**
 * Replaces matches in a string using JavaScript's native replacement rules.
 *
 * @group String
 * @since 1.0.0
 * @param string The source string.
 * @param searchValue A literal string or regular expression. With the default mode, a literal or nonglobal
 * expression replaces the first match and a global expression replaces all matches.
 * @param replaceValue A string with optional replacement tokens such as `$&` or `$1`, or a callback receiving
 * the match, captures, UTF-16 offset, source string, and named groups when present.
 * @param all Whether to use replace-all semantics. Defaults to false.
 * @returns The resulting string. Returns the original text when there is no match.
 * @throws `TypeError` if `all` is true and the regular expression is missing the global flag.
 * @see {@link https://lodash.com/docs/4.18.1#replace | Lodash replace} as `_.replace(string, pattern, replacement)`.
 * Lodash has no `all` flag. Use an escaped global regular expression for an equivalent nonempty literal search.
 * @example
 * replace("Hi Fred, I'm Fred!", "Fred", "Barney"); // => "Hi Barney, I'm Fred!"
 * @example
 * replace("Hi Fred, I'm Fred too!", "Fred", "Barney", true); // => "Hi Barney, I'm Barney too!"
 */
// oxlint-disable-next-line max-params
export function replace(
  string: string,
  searchValue: RegExp | string,

  // oxlint-disable-next-line typescript/no-explicit-any
  replaceValue: string | ((substring: string, ...args: any[]) => string),
  all = false,
): string {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  if (all) return string.replaceAll(searchValue, replaceValue as string);

  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  return string.replace(searchValue, replaceValue as string);
}

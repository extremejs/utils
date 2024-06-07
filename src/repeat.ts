/**
 * It will repeat the given `string`, by `count` times.
 * @group String
 * @since 1.0.0
 * @param string
 * @param count
 * @example
 * repeat("*", 3); // => "***"
 * @example
 * repeat("abc", 2); // => "abcabc"
 * @example
 * repeat("abc", 0); // => ""
 */
export function repeat(string: string, count: number): string {
  return string.repeat(count);
}

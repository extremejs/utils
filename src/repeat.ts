/**
 * Repeats a string using JavaScript's native repetition rules.
 *
 * @group String
 * @since 1.0.0
 * @param string The string to repeat.
 * @param count The required number of copies. Fractions are truncated toward zero. NaN acts as zero.
 * @returns The concatenated copies, or an empty string when the count truncates to zero.
 * @throws `RangeError` if the truncated count is negative, the count is infinite, or the result exceeds the
 * engine's string length limit.
 * @see {@link https://lodash.com/docs/4.18.1#repeat | Lodash repeat} as `_.repeat(string, count)`. Lodash
 * defaults to one copy and returns an empty string for negative counts.
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

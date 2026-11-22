/**
 * Checks whether the prefix ending at the given position has a case-sensitive suffix.
 * Numeric offsets are truncated and clamped to the range from zero to the string length.
 * NaN is treated as zero.
 *
 * @group String
 * @since 1.0.0
 * @param string The source string.
 * @param searchString The literal text to match.
 * @param endPosition The exclusive end offset in UTF-16 code units. Defaults to the string length.
 * @returns `true` for a match. An empty search string always matches.
 * @see {@link https://lodash.com/docs/4.18.1#endsWith | Lodash endsWith} as `_.endsWith(string, target, position)`.
 * Use strings and a numeric position. Lodash also coerces other inputs.
 * @example
 * endsWith("012345", "345"); // => true
 * @example
 * endsWith("012345", "34"); // => false
 * @example
 * endsWith("012345", "123", 4); // => true
 */
export function endsWith(string: string, searchString: string, endPosition = string.length): boolean {
  return string.endsWith(searchString, endPosition);
}

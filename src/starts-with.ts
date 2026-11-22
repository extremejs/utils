/**
 * Checks whether a string begins with a case-sensitive match at the given position.
 * Numeric offsets are truncated and clamped to the range from zero to the string length.
 * NaN is treated as zero.
 *
 * @group String
 * @since 1.0.0
 * @param string The source string.
 * @param searchString The literal text to match.
 * @param position The starting UTF-16 offset. Defaults to 0.
 * @returns `true` for a match. An empty search string always matches.
 * @see {@link https://lodash.com/docs/4.18.1#startsWith | Lodash startsWith} as `_.startsWith(string, target, position)`.
 * Use strings and a numeric position. Lodash also coerces other inputs.
 * @example
 * startsWith("012345", "012"); // => true
 * @example
 * startsWith("012345", "12"); // => false
 * @example
 * startsWith("012345", "234", 2); // => true
 */
export function startsWith(string: string, searchString: string, position = 0): boolean {
  return string.startsWith(searchString, position);
}

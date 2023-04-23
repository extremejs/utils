/**
 * It will check whether the `string` ends with the given `searchString`.
 * @group String
 * @since 1.0.0
 * @param string
 * @param searchString
 * @param [endPosition=string.length]
 * @example
 * endsWith("012345", "345");
 * // => true
 * @example
 * endsWith("012345", "34");
 * // => false
 * @example
 * endsWith("012345", "123", 4);
 * // => true
 */
export function endsWith(string: string, searchString: string, endPosition?: number): boolean {
  return string.endsWith(searchString, endPosition);
}

/**
 * It will check whether the `string` starts with the given `searchString`.
 * @group String
 * @since 1.0.0
 * @param string
 * @param searchString
 * @param position
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

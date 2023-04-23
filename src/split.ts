/**
 * It will split `string` by `separator`.
 * @group String
 * @since 1.0.0
 * @param string
 * @param separator
 * @param limit
 * @example
 * split("012345");
 * // => ["0", "1", "2", "3", "4", "5"]
 * @example
 * split("0,1,2,3,4,5", ",");
 * // => ["0", "1", "2", "3", "4", "5"]
 * @example
 * split("0,1,2,3,4,5", ",", 2);
 * // => ["0", "1"]
 */
export function split(string: string, separator: RegExp | string = "", limit?: number): string[] {
  return string.split(separator, limit);
}

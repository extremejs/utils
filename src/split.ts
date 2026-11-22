/**
 * Splits a string on a literal separator or a regular expression.
 *
 * @group String
 * @since 1.0.0
 * @param string The source string.
 * @param separator The delimiter. Defaults to `""`, which splits into individual UTF-16 code units.
 * @param limit An optional maximum result length, converted to an unsigned 32-bit integer. Omit it to keep all pieces.
 * @returns The pieces in order, including captures in the regular expression. A zero limit produces an empty array.
 * An unmatched capture can produce an `undefined` entry despite the declared `string[]` return type.
 * @see {@link https://lodash.com/docs/4.18.1#split | Lodash split} as `_.split(string, separator, limit)`.
 * Lodash keeps the whole string when the separator is omitted and preserves Unicode symbols when the separator
 * is empty.
 * @example
 * split("012345"); // => ["0", "1", "2", "3", "4", "5"]
 * @example
 * split("0,1,2,3,4,5", ","); // => ["0", "1", "2", "3", "4", "5"]
 * @example
 * split("0,1,2,3,4,5", ",", 2); // => ["0", "1"]
 */
export function split(string: string, separator: RegExp | string = "", limit?: number): string[] {
  return string.split(separator, limit);
}

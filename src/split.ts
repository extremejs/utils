import { splitStringSymbols } from "./internal/string-symbols.js";

/**
 * Splits a string on a literal separator or a regular expression.
 *
 * @group String
 * @since 1.0.0
 * @param string The source string.
 * @param separator The delimiter. Defaults to `""`, which splits into Unicode symbols, keeping joined emoji intact.
 * @param limit An optional maximum result length, converted to an unsigned 32-bit integer. Omit it to keep all pieces.
 * @returns The pieces in order. A zero limit produces an empty array.
 * @see {@link https://lodash.com/docs/4.18.1#split | Lodash split} as `_.split(string, separator, limit)`.
 * Lodash keeps the whole string when the separator is omitted.
 * @example
 * split("012345"); // => ["0", "1", "2", "3", "4", "5"]
 * @example
 * split("0,1,2,3,4,5", ","); // => ["0", "1", "2", "3", "4", "5"]
 * @example
 * split("0,1,2,3,4,5", ",", 2); // => ["0", "1"]
 * @example
 * split("a👩🏽‍💻", ""); // => ["a", "👩🏽‍💻"]
 */
export function split(string: string, separator?: string, limit?: number): string[];

/**
 * Splits a string with a regular expression or literal delimiter.
 *
 * @group String
 * @since 1.0.0
 * @param string The source string.
 * @param separator The delimiter. An empty or undefined separator splits into Unicode symbols.
 * @param limit An optional maximum result length, converted to an unsigned 32-bit integer.
 * @returns The pieces in order, including any regex captures. Unmatched captures are `undefined`.
 * @example
 * split("a;b", /(;)|(,)/); // => ["a", ";", undefined, "b"]
 */
export function split(string: string, separator?: RegExp | string, limit?: number): Array<string | undefined>;

export function split(string: string, separator: RegExp | string = "", limit?: number): Array<string | undefined> {
  return separator === "" ? splitStringSymbols(string, limit) : string.split(separator, limit);
}

import { lowerCase } from "./lower-case.js";
import { upperFirst } from "./upper-first.js";

/**
 * Lowercases the whole string, then uppercases the first UTF-16 code unit.
 *
 * @group String
 * @since 1.0.0
 * @param string The source string.
 * @returns The converted string, or an empty string for empty input.
 * @see {@link https://lodash.com/docs/4.18.1#capitalize | Lodash capitalize} as `_.capitalize(string)`. Lodash can case the first astral letter as a whole, while this utility operates on its leading code unit.
 * @example
 * capitalize("fRED"); // => "Fred"
 */
export function capitalize<Value extends string>(string: Value): Capitalize<Lowercase<Value>> {
  return upperFirst(lowerCase(string));
}

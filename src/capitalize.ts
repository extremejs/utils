import type { CaseFirstSymbolT } from "./internal/string-symbols.js";
import { lowerCase } from "./lower-case.js";
import { upperFirst } from "./upper-first.js";

/**
 * Lowercases the whole string, then uppercases the first Unicode symbol.
 *
 * @group String
 * @since 1.0.0
 * @param string The source string.
 * @returns The converted string, or an empty string for empty input. The literal return type widens
 * when a joiner or combining Greek iota may affect the first symbol.
 * @see {@link https://lodash.com/docs/4.18.1#capitalize | Lodash capitalize}
 * @example
 * capitalize("fRED"); // => "Fred"
 */
export function capitalize<Value extends string>(string: Value): CaseFirstSymbolT<Lowercase<Value>, "toUpperCase"> {
  return upperFirst(lowerCase(string));
}

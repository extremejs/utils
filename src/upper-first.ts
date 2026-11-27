import { type CaseFirstSymbolT, caseFirstSymbol } from "./internal/string-symbols.js";

/**
 * Converts the first Unicode symbol to uppercase, preserving the rest of the string.
 *
 * @group String
 * @since 1.0.0
 * @param string The source string.
 * @returns The converted string, or an empty string for empty input. The literal return type widens
 * when a joiner or combining Greek iota may affect the first symbol.
 * @see {@link https://lodash.com/docs/4.18.1#upperFirst | Lodash upperFirst}
 * @example
 * upperFirst("frED"); // => "FrED"
 */
export function upperFirst<Value extends string>(string: Value): CaseFirstSymbolT<Value, "toUpperCase"> {
  return caseFirstSymbol(string, "toUpperCase");
}

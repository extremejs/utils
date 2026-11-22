import { first } from "./first.js";
import { tail } from "./tail.js";
import { upperCase } from "./upper-case.js";

/**
 * Converts the first UTF-16 code unit to uppercase, preserving the rest of the string.
 *
 * @group String
 * @since 1.0.0
 * @param string The source string.
 * @returns The converted string, or an empty string for empty input.
 * @see {@link https://lodash.com/docs/4.18.1#upperFirst | Lodash upperFirst} as `_.upperFirst(string)`. Lodash can case the first astral letter as a whole, while this utility operates on its leading code unit.
 * @example
 * upperFirst("frED"); // => "FrED"
 */
export function upperFirst<Value extends string>(string: Value): Capitalize<Value> {
  // Keep the fallback for an empty string.
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  return (upperCase(first(string) ?? "") + tail(string)) as Capitalize<Value>;
}

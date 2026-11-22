import { first } from "./first.js";
import { lowerCase } from "./lower-case.js";
import { tail } from "./tail.js";

/**
 * Converts the first UTF-16 code unit to lowercase, preserving the rest of the string.
 *
 * @group String
 * @since 1.0.0
 * @param string The source string.
 * @returns The converted string, or an empty string for empty input.
 * @see {@link https://lodash.com/docs/4.18.1#lowerFirst | Lodash lowerFirst} as `_.lowerFirst(string)`. Lodash can case the first astral letter as a whole, while this utility operates on its leading code unit.
 * @example
 * lowerFirst("FRED"); // => "fRED"
 */
export function lowerFirst<Value extends string>(string: Value): Uncapitalize<Value> {
  // Keep the fallback for an empty string.
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  return (lowerCase(first(string) ?? "") + tail(string)) as Uncapitalize<Value>;
}

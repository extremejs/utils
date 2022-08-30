import { LETTER_CASE_REGEX } from "./internals/index.js";
import join from "./join.js";
import lowerCase from "./lower-case.js";
import slice from "./slice.js";
import upperCase from "./upper-case.js";

/**
 * It will convert the given string to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 * @since 1.0.0
 * @param string
 * @example
 * camelCase("some_database_field_name");
 * // => "someDatabaseFieldName"
 * @example
 * camelCase("Some label that needs to be camelized");
 * // => "someLabelThatNeedsToBeCamelized"
 * @example
 * camelCase("some-javaScript-property");
 * // => "someJavaScriptProperty"
 * @example
 * camelCase("some-mixed_string with spaces_underscores-and-hyphens");
 * // => "someMixedStringWithSpacesUnderscoresAndHyphens"
 */
export default function camelCase(string: string): string {
  string = join((string.match(LETTER_CASE_REGEX) ?? [])
    .map(x => upperCase(slice(x, 0, 1)) + lowerCase(slice(x, 1))));

  return lowerCase(slice(string, 0, 1)) + slice(string, 1);
}

import { LETTER_CASE_REGEX } from "./constants/index.js";
import { first } from "./first.js";
import { join } from "./join.js";
import { lowerCase } from "./lower-case.js";
import { tail } from "./tail.js";
import { upperCase } from "./upper-case.js";

/**
 * Formats the ASCII letter and digit runs in a string as camel case.
 * Case transitions, digits, and punctuation can mark word boundaries.
 *
 * @group String
 * @since 1.0.0
 * @param string The source string.
 * @returns A lowercase initial word followed by capitalized words without separators. If there are no matches,
 * returns an empty string.
 * @see {@link https://lodash.com/docs/4.18.1#camelCase | Lodash camelCase} as `_.camelCase(string)`. Lodash also
 * recognizes Unicode words and emoji, deburrs Latin letters, and joins the parts of contractions.
 * @example
 * camelCase("some_database_field_name"); // => "someDatabaseFieldName"
 * @example
 * camelCase("Some label that needs to be camelized"); // => "someLabelThatNeedsToBeCamelized"
 * @example
 * camelCase("some-javaScript-property"); // => "someJavaScriptProperty"
 * @example
 * camelCase("some-mixed_string with spaces_underscores-and-hyphens");
 * // => "someMixedStringWithSpacesUnderscoresAndHyphens"
 */
export function camelCase(string: string): string {
  string = join((string.match(LETTER_CASE_REGEX) ?? []).map(x => upperCase(first(x)!) + lowerCase(tail(x))));

  return lowerCase(first(string) ?? "") + tail(string);
}

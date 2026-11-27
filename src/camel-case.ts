import { caseWords } from "./internal/case-words.js";
import { lowerCase } from "./lower-case.js";
import { upperFirst } from "./upper-first.js";

/**
 * Formats Unicode words and symbols as camel case.
 * Latin accents are folded, apostrophes are removed, and ordinals and emoji are kept together.
 *
 * @group String
 * @since 1.0.0
 * @param string The source string.
 * @returns A lowercase initial word followed by capitalized words without separators. If there are no matches,
 * returns an empty string.
 * @see {@link https://lodash.com/docs/4.18.1#camelCase | Lodash camelCase}
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
  return caseWords(string).map((word, index) => {
    const lower = lowerCase(word);

    return index === 0 ? lower : upperFirst(lower);
  })
    .join("");
}

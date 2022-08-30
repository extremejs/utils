import lowerCase from "./lower-case.js";
import slice from "./slice.js";

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
  string = (string.match(/[A-Z]{2,}(?=[A-Z][a-z]+\d*|\b)|[A-Z]?[a-z]+|[A-Z]|\d+/g) ?? [""])
    .map(x => slice(x, 0, 1).toUpperCase() + lowerCase(slice(x, 1)))
    .join("");

  return lowerCase(slice(string, 0, 1)) + slice(string, 1);
}

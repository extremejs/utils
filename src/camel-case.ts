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
    .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
    .join("");

  return string.slice(0, 1).toLowerCase() + string.slice(1);
}
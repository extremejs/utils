import { LETTER_CASE_REGEX } from "./internals/index.js";
import { join } from "./join.js";
import { lowerCase } from "./lower-case.js";

/**
 * It will convert the given `string` to [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 * @group String
 * @since 1.0.0
 * @param string
 * @example
 * kebabCase("camelCase"); // => "camel-case"
 * @example
 * kebabCase("some text"); // => "some-text"
 * @example
 * kebabCase("some-mixed_string With spaces_underscores-and-hyphens");
 * // => "some-mixed-string-with-spaces-underscores-and-hyphens"
 * @example
 * kebabCase("AllThe-small Things"); // => "all-the-small-things"
 * @example
 * kebabCase("IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML");
 * // => "i-am-listening-to-fm-while-loading-different-url-on-my-browser-and-also-editing-some-xml-and-html"
 */
export function kebabCase(string: string): string {
  return join((string.match(LETTER_CASE_REGEX) ?? [])
    .map(lowerCase), "-");
}

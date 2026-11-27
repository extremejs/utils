import { caseWords } from "./internal/case-words.js";
import { lowerCase } from "./lower-case.js";

/**
 * Formats Unicode words and symbols as kebab case.
 * Latin accents are folded, apostrophes are removed, and ordinals and emoji are kept together.
 *
 * @group String
 * @since 1.0.0
 * @param string The source string.
 * @returns Lowercase words separated by hyphens. If there are no matches, returns an empty string.
 * @see {@link https://lodash.com/docs/4.18.1#kebabCase | Lodash kebabCase}
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
  return caseWords(string).map(lowerCase)
    .join("-");
}

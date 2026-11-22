import { LETTER_CASE_REGEX } from "./constants/index.js";
import { join } from "./join.js";
import { lowerCase } from "./lower-case.js";

/**
 * Formats the ASCII letter and digit runs in a string as kebab case.
 * Case transitions, digits, and punctuation can mark word boundaries.
 *
 * @group String
 * @since 1.0.0
 * @param string The source string.
 * @returns Lowercase words separated by hyphens. If there are no matches, returns an empty string.
 * @see {@link https://lodash.com/docs/4.18.1#kebabCase | Lodash kebabCase} as `_.kebabCase(string)`. Lodash also recognizes Unicode words and emoji, deburrs Latin letters, and joins the parts of contractions.
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

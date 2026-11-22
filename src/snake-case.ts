import { LETTER_CASE_REGEX } from "./constants/index.js";
import { join } from "./join.js";
import { lowerCase } from "./lower-case.js";

/**
 * Formats the ASCII letter and digit runs in a string as snake case.
 * Case transitions, digits, and punctuation can mark word boundaries.
 *
 * @group String
 * @since 1.0.0
 * @param string The source string.
 * @returns Lowercase words separated by underscores. If there are no matches, returns an empty string.
 * @see {@link https://lodash.com/docs/4.18.1#snakeCase | Lodash snakeCase} as `_.snakeCase(string)`. Lodash also recognizes Unicode words and emoji, deburrs Latin letters, and joins the parts of contractions.
 * @example
 * snakeCase("camelCase"); // => "camel_case"
 * @example
 * snakeCase("some text"); // => "some_text"
 * @example
 * snakeCase("some-mixed_string With spaces_underscores-and-hyphens");
 * // => "some_mixed_string_with_spaces_underscores_and_hyphens"
 * @example
 * snakeCase("AllThe-small Things"); // => "all_the_small_things"
 * @example
 * snakeCase("IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML");
 * // => "i_am_listening_to_fm_while_loading_different_url_on_my_browser_and_also_editing_some_xml_and_html"
 */
export function snakeCase(string: string): string {
  return join((string.match(LETTER_CASE_REGEX) ?? [])
    .map(lowerCase), "_");
}

import { LETTER_CASE_REGEX } from "./internals/index.js";
import join from "./join.js";
import lowerCase from "./lower-case.js";

/**
 * It will convert the given `string` to [snake case](https://en.wikipedia.org/wiki/Snake_case).
 * @since 1.0.0
 * @param string
 * @example
 * snakeCase("camelCase");
 * // => "camel_case"
 * @example
 * snakeCase("some text");
 * // => "some_text"
 * @example
 * snakeCase("some-mixed_string With spaces_underscores-and-hyphens");
 * // => "some_mixed_string_with_spaces_underscores_and_hyphens"
 * @example
 * snakeCase("AllThe-small Things");
 * // => "all_the_small_things"
 * @example
 * snakeCase("IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML");
 * // => "i_am_listening_to_fm_while_loading_different_url_on_my_browser_and_also_editing_some_xml_and_html"
 */
export default function snakeCase(string: string): string {
  return join((string.match(LETTER_CASE_REGEX) ?? [])
    .map(lowerCase), "_");
}

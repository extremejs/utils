import { snakeCase } from "@extremejs/utils";

it("should convert the given string to snake case", () => {
  expect(snakeCase("camelCase")).toBe("camel_case");

  expect(snakeCase("some text")).toBe("some_text");

  expect(snakeCase("some-mixed_string With spaces_underscores-and-hyphens"))
    .toBe("some_mixed_string_with_spaces_underscores_and_hyphens");

  expect(snakeCase("AllThe-small Things")).toBe("all_the_small_things");

  expect(snakeCase("IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML"))
    .toBe("i_am_listening_to_fm_while_loading_different_url_on_my_browser_and_also_editing_some_xml_and_html");

  expect(snakeCase("")).toBe("");
});

import { kebabCase } from "@extremejs/utils";

it("should convert the given string to kebab case", () => {
  expect(kebabCase("camelCase")).toBe("camel-case");

  expect(kebabCase("some text")).toBe("some-text");

  expect(kebabCase("some-mixed_string With spaces_underscores-and-hyphens"))
    .toBe("some-mixed-string-with-spaces-underscores-and-hyphens");

  expect(kebabCase("AllThe-small Things")).toBe("all-the-small-things");

  expect(kebabCase("IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML"))
    .toBe("i-am-listening-to-fm-while-loading-different-url-on-my-browser-and-also-editing-some-xml-and-html");

  expect(kebabCase("")).toBe("");
});

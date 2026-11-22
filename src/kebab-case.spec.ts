import { kebabCase } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

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

describe("lodash compatibility", () => {
  it.each(["foo bar", "Foo bar", "foo Bar", "Foo Bar", "FOO BAR", "fooBar", "--foo-bar--", "__foo_bar__"])(
    "formats %j and keeps the result stable on a second pass",
    (value) => {
      const local = kebabCase(value);
      const upstream = lodash.kebabCase(value);

      expect(local).toBe("foo-bar");
      expect(upstream).toBe("foo-bar");
      expect(kebabCase(local)).toBe(local);
      expect(lodash.kebabCase(upstream)).toBe(upstream);
    },
  );

  it.each(["", "×÷"])("returns an empty result for %j", (value) => {
    expect(kebabCase(value)).toBe("");
    expect(lodash.kebabCase(value)).toBe("");
  });

  it.each([
    ["déjà vu", "d-j-vu", "deja-vu"],
    ["a b's c", "a-b-s-c", "a-bs-c"],
    ["a b’t c", "a-b-t-c", "a-bt-c"],
    ["🚀 Foo", "foo", "🚀-foo"],
    ["42nd Street", "42-nd-street", "42nd-street"],
  ])("uses different word boundaries for %j", (value, local, upstream) => {
    expect(kebabCase(value)).toBe(local);
    expect(lodash.kebabCase(value)).toBe(upstream);
  });
});

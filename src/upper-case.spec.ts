import { upperCase } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

it("should convert the given string to uppercase", () => {
  expect(upperCase("--foo-bar--")).toBe("--FOO-BAR--");

  expect(upperCase("fooBar")).toBe("FOOBAR");

  expect(upperCase("__foo_bar__")).toBe("__FOO_BAR__");
});

describe("lodash compatibility", () => {
  it.each([
    ["--Foo-Bar", "--FOO-BAR"],
    ["fooBar", "FOOBAR"],
    ["__foo_bar__", "__FOO_BAR__"],
    ["straße é", "STRASSE É"],
    ["", ""],
  ])(
    "changes the case of %j without splitting words, like lodash.toUpper",
    (value, expected) => {
      expect(upperCase(value)).toBe(expected);
      expect(lodash.toUpper(value)).toBe(expected);
    },
  );

  it("keeps punctuation where lodash.upperCase rebuilds the words", () => {
    expect(upperCase("FooBar-Baz")).toBe("FOOBAR-BAZ");
    expect(lodash.upperCase("FooBar-Baz")).toBe("FOO BAR BAZ");
  });
});

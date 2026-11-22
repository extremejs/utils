import { lowerCase } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

it("should convert the given string to lowercase", () => {
  expect(lowerCase("--Foo-Bar--")).toBe("--foo-bar--");

  expect(lowerCase("fooBar")).toBe("foobar");

  expect(lowerCase("__FOO_BAR__")).toBe("__foo_bar__");
});

describe("lodash compatibility", () => {
  it.each([
    ["--Foo-Bar--", "--foo-bar--"],
    ["fooBar", "foobar"],
    ["__FOO_BAR__", "__foo_bar__"],
    ["ÉCOLE Σ", "école σ"],
    ["", ""],
  ])(
    "changes the case of %j without splitting words, like lodash.toLower",
    (value, expected) => {
      expect(lowerCase(value)).toBe(expected);
      expect(lodash.toLower(value)).toBe(expected);
    },
  );

  it("keeps punctuation where lodash.lowerCase rebuilds the words", () => {
    expect(lowerCase("FooBar-Baz")).toBe("foobar-baz");
    expect(lodash.lowerCase("FooBar-Baz")).toBe("foo bar baz");
  });
});

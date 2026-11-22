import { capitalize } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

it("should convert the first character of the string to uppercase and the remaining to lowercase", () => {
  expect(capitalize("fred")).toBe("Fred");

  expect(capitalize("FRED")).toBe("Fred");

  expect(capitalize("frED")).toBe("Fred");

  expect(capitalize("")).toBe("");
});

describe("lodash compatibility", () => {
  it.each([
    ["fred", "Fred"],
    ["Fred", "Fred"],
    [" fred", " fred"],
    ["fRED", "Fred"],
    ["🚀", "🚀"],
    ["", ""],
  ])("changes the capitalization of %j", (value, expected) => {
    expect(capitalize(value)).toBe(expected);
    expect(lodash.capitalize(value)).toBe(expected);
  });

  it("uses the first UTF-16 code unit where Lodash cases an astral letter", () => {
    expect(capitalize("𐐀BC")).toBe("𐐨bc");
    expect(lodash.capitalize("𐐀BC")).toBe("𐐀bc");
  });
});

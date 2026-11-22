import { lowerFirst } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

it("should convert the first character of the string to lowercase", () => {
  expect(lowerFirst("Fred")).toBe("fred");

  expect(lowerFirst("FRED")).toBe("fRED");

  expect(lowerFirst("fred")).toBe("fred");

  expect(lowerFirst("")).toBe("");
});

describe("lodash compatibility", () => {
  it.each([
    ["fred", "fred"],
    ["Fred", "fred"],
    ["FRED", "fRED"],
    ["ÉCOLE", "éCOLE"],
    ["", ""],
  ])("changes the capitalization of %j", (value, expected) => {
    expect(lowerFirst(value)).toBe(expected);
    expect(lodash.lowerFirst(value)).toBe(expected);
  });

  it("uses the first UTF-16 code unit where Lodash cases an astral letter", () => {
    expect(lowerFirst("𐐀BC")).toBe("𐐀BC");
    expect(lodash.lowerFirst("𐐀BC")).toBe("𐐨BC");
  });
});

import { upperFirst } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

it("should convert the first character of the string to uppercase", () => {
  expect(upperFirst("fred")).toBe("Fred");

  expect(upperFirst("FRED")).toBe("FRED");

  expect(upperFirst("frED")).toBe("FrED");

  expect(upperFirst("")).toBe("");
});

describe("lodash compatibility", () => {
  it.each([
    ["fred", "Fred"],
    ["Fred", "Fred"],
    ["FRED", "FRED"],
    ["ßeta", "SSeta"],
    ["", ""],
  ])("changes the capitalization of %j", (value, expected) => {
    expect(upperFirst(value)).toBe(expected);
    expect(lodash.upperFirst(value)).toBe(expected);
  });

  it("uses the first UTF-16 code unit where Lodash cases an astral letter", () => {
    expect(upperFirst("𐐨BC")).toBe("𐐨BC");
    expect(lodash.upperFirst("𐐨BC")).toBe("𐐀BC");
  });
});

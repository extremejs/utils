import { lowerFirst } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, expectTypeOf, it } from "vitest";

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

  it("cases an astral letter and infers its result", () => {
    const result = lowerFirst("𐐀BC");

    expect(result).toBe("𐐨BC");
    expect(lodash.lowerFirst("𐐀BC")).toBe("𐐨BC");
    expectTypeOf(result).toEqualTypeOf<"𐐨BC">();
    expectTypeOf(lowerFirst("FRED")).toEqualTypeOf<"fRED">();
    expectTypeOf(lowerFirst("HELLO👩‍💻")).toEqualTypeOf<"hELLO👩‍💻">();
  });
});

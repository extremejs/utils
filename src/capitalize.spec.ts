import { capitalize } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, expectTypeOf, it } from "vitest";

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

  it("cases an astral letter and infers its result", () => {
    const result = capitalize("𐐀BC");

    expect(result).toBe("𐐀bc");
    expect(lodash.capitalize("𐐀BC")).toBe("𐐀bc");
    expectTypeOf(result).toEqualTypeOf<"𐐀bc">();
    expectTypeOf(capitalize("fRED")).toEqualTypeOf<"Fred">();
    expectTypeOf(capitalize("HELLO👩‍💻")).toEqualTypeOf<"Hello👩‍💻">();
  });
});

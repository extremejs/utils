import { upperFirst } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, expectTypeOf, it } from "vitest";

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
    ["a\u0345bc", "AΙbc"],
    ["👩🏽‍💻BC", "👩🏽‍💻BC"],
    ["", ""],
  ])("changes the capitalization of %j", (value, expected) => {
    expect(upperFirst(value)).toBe(expected);
    expect(lodash.upperFirst(value)).toBe(expected);
  });

  it("cases an astral letter and infers its result", () => {
    const result = upperFirst("𐐨BC");

    expect(result).toBe("𐐀BC");
    expect(lodash.upperFirst("𐐨BC")).toBe("𐐀BC");
    expectTypeOf(result).toEqualTypeOf<"𐐀BC">();
    expectTypeOf(upperFirst("frED")).toEqualTypeOf<"FrED">();
    expectTypeOf(upperFirst("hello👩‍💻")).toEqualTypeOf<"Hello👩‍💻">();
  });

  it("widens the result when the leading symbol can case multiple code points", () => {
    expectTypeOf(upperFirst("a\u0345bc")).toEqualTypeOf<string>();
    expectTypeOf<ReturnType<typeof upperFirst<`a${ string }`>>>().toEqualTypeOf<string>();
  });
});

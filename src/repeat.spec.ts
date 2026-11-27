import { repeat } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, expectTypeOf, it } from "vitest";

it("should repeat the given string, by count times", () => {
  expect(repeat("*", 3)).toBe("***");

  expect(repeat("abc", 2)).toBe("abcabc");

  expect(repeat("abc", 0)).toBe("");
});

describe("lodash compatibility", () => {
  it.each([
    ["*", 3, "***"],
    ["abc", 2, "abcabc"],
    ["abc", 2.6, "abcabc"],
    ["abc", 0, ""],
    ["abc", -0.5, ""],
    ["abc", Number.NaN, ""],
    ["", 2, ""],
    ["🚀", 2, "🚀🚀"],
  ])("repeats %j with count %s", (value, count, expected) => {
    expect(repeat(value, count)).toBe(expected);
    expect(lodash.repeat(value, count)).toBe(expected);
  });

  it("throws for a negative integer while Lodash returns an empty string", () => {
    expect(() => repeat("abc", -2)).toThrow(RangeError);
    expect(lodash.repeat("abc", -2)).toBe("");
  });

  it("throws for an infinite count while Lodash returns an empty string", () => {
    expect(() => repeat("abc", Infinity)).toThrow(RangeError);
    expect(lodash.repeat("abc", Infinity)).toBe("");
  });

  it("accepts an explicit count of one, which Lodash also uses by default", () => {
    expect(repeat("abc", 1)).toBe("abc");
    expect(lodash.repeat("abc", 1)).toBe("abc");
    expect(lodash.repeat("abc")).toBe("abc");
    expectTypeOf<Parameters<typeof repeat>>().toEqualTypeOf<[string, number]>();
  });
});

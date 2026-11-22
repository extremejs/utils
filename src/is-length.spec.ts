import { isLength } from "@extremejs/utils";
import { isLength as lodashIsLength } from "lodash";
import { describe, expect, it } from "vitest";
import { boxedOne, nonNumericValues } from "#test";

it("should check if value is a valid array-like length", () => {
  expect(isLength(2)).toBe(true);

  expect(isLength(Number.MIN_VALUE)).toBe(false);

  expect(isLength(Infinity)).toBe(false);

  expect(isLength("2")).toBe(false);
});

describe("lodash compatibility", () => {
  it("accepts primitive numbers within the documented limits", () => {
    for (const value of [0, -0, 3, Number.MAX_SAFE_INTEGER]) {
      expect(isLength(value)).toBe(true);
      expect(lodashIsLength(value)).toBe(true);
    }
  });

  it("rejects boxes, coercible values, and numbers outside the documented limits", () => {
    const invalidLengths = [-1, "1", 1.1, Number.MAX_SAFE_INTEGER + 1, Number.NaN, Infinity, boxedOne];

    for (const value of [...nonNumericValues, ...invalidLengths]) {
      expect(isLength(value)).toBe(false);
      expect(lodashIsLength(value)).toBe(false);
    }
  });
});

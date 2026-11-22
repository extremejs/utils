import { isInteger } from "@extremejs/utils";
import { isInteger as lodashIsInteger } from "lodash";
import { describe, expect, it } from "vitest";
import { boxedOne, nonNumericValues } from "#test";

it("should determine whether the provided value is an integer or not", () => {
  expect(isInteger(2)).toBe(true);

  expect(isInteger(2.2)).toBe(false);

  expect(isInteger(Number.MIN_VALUE)).toBe(false);

  expect(isInteger(Infinity)).toBe(false);

  expect(isInteger("2")).toBe(false);
});

describe("lodash compatibility", () => {
  it("accepts primitive numbers within the documented limits", () => {
    for (const value of [-1, 0, -0, 1, Number.MAX_VALUE, Number.MAX_SAFE_INTEGER + 1]) {
      expect(isInteger(value)).toBe(true);
      expect(lodashIsInteger(value)).toBe(true);
    }
  });

  it("rejects boxes, coercible values, and numbers outside the documented limits", () => {
    for (const value of [...nonNumericValues, Number.NaN, Infinity, -Infinity, boxedOne, 3.14]) {
      expect(isInteger(value)).toBe(false);
      expect(lodashIsInteger(value)).toBe(false);
    }
  });
});

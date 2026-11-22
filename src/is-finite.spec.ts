import { isFinite } from "@extremejs/utils";
import { isFinite as lodashIsFinite } from "lodash";
import { describe, expect, it } from "vitest";
import { boxedOne, nonNumericValues } from "#test";

it("should determine whether the provided value is a finite number or not", () => {
  expect(isFinite(2)).toBe(true);

  expect(isFinite(Number.MIN_VALUE)).toBe(true);

  expect(isFinite(Number.MAX_VALUE)).toBe(true);

  expect(isFinite(Infinity)).toBe(false);

  expect(isFinite("2")).toBe(false);
});

describe("lodash compatibility", () => {
  it("accepts primitive numbers within the documented limits", () => {
    for (const value of [0, -0, 1, 3.14, -1, Number.MAX_VALUE]) {
      expect(isFinite(value)).toBe(true);
      expect(lodashIsFinite(value)).toBe(true);
    }
  });

  it("rejects boxes, coercible values, and numbers outside the documented limits", () => {
    for (const value of [...nonNumericValues, [], Number.NaN, Infinity, -Infinity, boxedOne]) {
      expect(isFinite(value)).toBe(false);
      expect(lodashIsFinite(value)).toBe(false);
    }
  });
});

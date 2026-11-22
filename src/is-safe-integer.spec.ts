import { MAX_SAFE_INTEGER, MIN_SAFE_INTEGER, isSafeInteger } from "@extremejs/utils";
import { isSafeInteger as lodashIsSafeInteger } from "lodash";
import { describe, expect, it } from "vitest";
import { boxedOne, nonNumericValues } from "#test";

it("should determine whether the provided value is a safe integer or not", () => {
  expect(isSafeInteger(2)).toBe(true);

  expect(isSafeInteger(2.2)).toBe(false);

  expect(isSafeInteger(Number.MIN_VALUE)).toBe(false);

  expect(isSafeInteger(Infinity)).toBe(false);

  expect(isSafeInteger("2")).toBe(false);
});

it("should return minimum safe integer", () => {
  expect(MIN_SAFE_INTEGER).toBe(Number.MIN_SAFE_INTEGER);

  expect(MIN_SAFE_INTEGER).toBe(-9_007_199_254_740_991);
});

it("should return maximum safe integer", () => {
  expect(MAX_SAFE_INTEGER).toBe(Number.MAX_SAFE_INTEGER);

  expect(MAX_SAFE_INTEGER).toBe(9_007_199_254_740_991);
});

describe("lodash compatibility", () => {
  it("accepts primitive numbers within the documented limits", () => {
    for (const value of [-1, 0, -0, 1, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]) {
      expect(isSafeInteger(value)).toBe(true);
      expect(lodashIsSafeInteger(value)).toBe(true);
    }
  });

  it("rejects boxes, coercible values, and numbers outside the documented limits", () => {
    for (const value of [
      ...nonNumericValues,
      Number.NaN,
      Infinity,
      -Infinity,
      boxedOne,
      3.14,
      Number.MAX_VALUE,
      Number.MAX_SAFE_INTEGER + 1,
      Number.MIN_SAFE_INTEGER - 1,
    ]) {
      expect(isSafeInteger(value)).toBe(false);
      expect(lodashIsSafeInteger(value)).toBe(false);
    }
  });
});

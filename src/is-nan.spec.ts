import { runInNewContext } from "node:vm";
import { isNaN } from "@extremejs/utils";
import { isNaN as lodashIsNaN } from "lodash";
import { describe, expect, it } from "vitest";
import { boxedOne, nonNumericValues } from "#test";

it("should determine whether the provided value is NaN or not", () => {
  expect(isNaN(Number.NaN)).toBe(true);

  expect(isNaN(Number(Number.NaN))).toBe(true);

  expect(isNaN(void 0)).toBe(false);
});

describe("lodash compatibility", () => {
  it("recognizes primitive NaN from either realm", () => {
    for (const value of [Number.NaN, runInNewContext("NaN") as unknown]) {
      expect(isNaN(value)).toBe(true);
      expect(lodashIsNaN(value)).toBe(true);
    }
  });

  it("rejects other numbers and values without coercion", () => {
    for (const value of [...nonNumericValues, 0, 1, boxedOne, Infinity]) {
      expect(isNaN(value)).toBe(false);
      expect(lodashIsNaN(value)).toBe(false);
    }
  });

  it("distinguishes boxed NaN from primitive NaN", () => {
    // oxlint-disable-next-line unicorn/new-for-builtins -- Compare both outcomes for a boxed NaN.
    const value: unknown = Object(Number.NaN);

    expect(isNaN(value)).toBe(false);
    expect(lodashIsNaN(value)).toBe(true);
  });
});

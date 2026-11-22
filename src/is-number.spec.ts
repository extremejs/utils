import { runInNewContext } from "node:vm";
import { isNumber } from "@extremejs/utils";
import { isNumber as lodashIsNumber } from "lodash";
import { describe, expect, it } from "vitest";
import { boxedOne, nonPrimitiveValues } from "#test";

it("should determine whether the provided value is a number or not", () => {
  expect(isNumber("foo")).toBe(false);

  expect(isNumber(false)).toBe(false);

  expect(isNumber(2)).toBe(true);

  expect(isNumber(Number(3))).toBe(true);

  // oxlint-disable-next-line unicorn/new-for-builtins -- Exercise the original constructor call and boxed value.
  expect(isNumber(new Number(4))).toBe(true);
});

describe("lodash compatibility", () => {
  it("recognizes primitive and boxed numbers", () => {
    for (const value of [0, -0, 2, Number.NaN, Infinity, -Infinity, boxedOne]) {
      expect(isNumber(value)).toBe(true);
      expect(lodashIsNumber(value)).toBe(true);
    }
  });

  it("rejects other values without coercion", () => {
    for (const value of [...nonPrimitiveValues, null, void 0, true, false, "", "1", 1n, Symbol("x")]) {
      expect(isNumber(value)).toBe(false);
      expect(lodashIsNumber(value)).toBe(false);
    }
  });

  it("distinguishes a boxed value from another realm", () => {
    const value: unknown = runInNewContext("Object(1)");

    expect(isNumber(value)).toBe(false);
    expect(lodashIsNumber(value)).toBe(true);
  });
});

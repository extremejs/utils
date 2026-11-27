import { runInNewContext } from "node:vm";
import { isBoolean } from "@extremejs/utils";
import { isBoolean as lodashIsBoolean } from "lodash";
import { describe, expect, it } from "vitest";
import { nonPrimitiveValues } from "#test";

it("should determine whether the provided value is a boolean or not", () => {
  expect(isBoolean(false)).toBe(true);

  expect(isBoolean(Boolean(false))).toBe(true);

  // oxlint-disable-next-line unicorn/new-for-builtins -- Exercise the original constructor call and boxed value.
  expect(isBoolean(new Boolean(false))).toBe(true);

  expect(isBoolean("foo bar")).toBe(false);

  expect(isBoolean(3)).toBe(false);
});

describe("lodash compatibility", () => {
  it("recognizes primitive and boxed booleans", () => {
    // oxlint-disable-next-line unicorn/new-for-builtins -- Exercise boxed primitive values.
    for (const value of [true, false, Object(true), Object(false)]) {
      expect(isBoolean(value)).toBe(true);
      expect(lodashIsBoolean(value)).toBe(true);
    }
  });

  it("rejects other values without coercion", () => {
    for (const value of [...nonPrimitiveValues, null, void 0, 0, 1, Number.NaN, "", "true", Symbol("x")]) {
      expect(isBoolean(value)).toBe(false);
      expect(lodashIsBoolean(value)).toBe(false);
    }
  });

  it("recognizes a boxed value from another realm", () => {
    const value: unknown = runInNewContext("Object(false)");

    expect(isBoolean(value)).toBe(true);
    expect(lodashIsBoolean(value)).toBe(true);
  });
});

import { runInNewContext } from "node:vm";
import { isSymbol } from "@extremejs/utils";
import { isSymbol as lodashIsSymbol } from "lodash";
import { describe, expect, it } from "vitest";
import { nonPrimitiveValues } from "#test";

it("should determine whether the provided value is a symbol or not", () => {
  expect(isSymbol(Symbol())).toBe(true);

  expect(isSymbol(Symbol("foo"))).toBe(true);

  // oxlint-disable-next-line unicorn/new-for-builtins -- Exercise the original constructor call and boxed value.
  expect(isSymbol(Object(Symbol("foo")))).toBe(true);

  expect(isSymbol("bar")).toBe(false);

  expect(isSymbol(3)).toBe(false);
});

describe("lodash compatibility", () => {
  it("recognizes primitive and boxed symbols", () => {
    // oxlint-disable-next-line unicorn/new-for-builtins -- Exercise boxed primitive values.
    for (const value of [Symbol("x"), Object(Symbol("x"))]) {
      expect(isSymbol(value)).toBe(true);
      expect(lodashIsSymbol(value)).toBe(true);
    }
  });

  it("rejects other values without coercion", () => {
    for (const value of [...nonPrimitiveValues, null, void 0, true, false, 0, 1, Number.NaN, "", "x"]) {
      expect(isSymbol(value)).toBe(false);
      expect(lodashIsSymbol(value)).toBe(false);
    }
  });

  it("recognizes a boxed value from another realm", () => {
    const value: unknown = runInNewContext('Object(Symbol("x"))');

    expect(isSymbol(value)).toBe(true);
    expect(lodashIsSymbol(value)).toBe(true);
  });
});

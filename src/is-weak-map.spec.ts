import { isWeakMap } from "@extremejs/utils";
import { isWeakMap as lodashIsWeakMap } from "lodash";
import { describe, expect, it } from "vitest";
import { builtInPredicatePrimitives, foreignValues, nonPrimitiveValues } from "#test";

it("should determine whether the provided value is a WeakMap object or not", () => {
  expect(isWeakMap(new WeakMap())).toBe(true);

  expect(isWeakMap(new Map())).toBe(false);
});

describe("lodash compatibility", () => {
  it("recognizes local weak maps", () => {
    const value = new WeakMap();

    expect(isWeakMap(value)).toBe(true);
    expect(lodashIsWeakMap(value)).toBe(true);
  });

  it("rejects nonmatching values", () => {
    for (const value of [
      ...builtInPredicatePrimitives,
      ...nonPrimitiveValues,
      new Map(),
      { constructor: false },
      { constructor: true },
    ]) {
      expect(isWeakMap(value)).toBe(false);
      expect(lodashIsWeakMap(value)).toBe(false);
    }
  });

  it("recognizes genuine values from another realm", () => {
    for (const value of foreignValues("new WeakMap()")) {
      expect(isWeakMap(value)).toBe(true);
      expect(lodashIsWeakMap(value)).toBe(true);
    }
  });
});

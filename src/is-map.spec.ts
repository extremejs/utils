import { isMap } from "@extremejs/utils";
import { isMap as lodashIsMap } from "lodash";
import { describe, expect, it } from "vitest";
import { builtInPredicatePrimitives, foreignValues, nonPrimitiveValues } from "#test";

it("should determine whether the provided value is a Map object or not", () => {
  expect(isMap(new Map())).toBe(true);

  expect(isMap(new WeakMap())).toBe(false);
});

describe("lodash compatibility", () => {
  it("recognizes local maps", () => {
    const value = new Map([["key", 1]]);

    expect(isMap(value)).toBe(true);
    expect(lodashIsMap(value)).toBe(true);
  });

  it("rejects nonmatching values", () => {
    for (const value of [
      ...builtInPredicatePrimitives,
      ...nonPrimitiveValues,
      new WeakMap(),
      { constructor: false },
      { constructor: true },
    ]) {
      expect(isMap(value)).toBe(false);
      expect(lodashIsMap(value)).toBe(false);
    }
  });

  it("uses the local constructor for values from another realm", () => {
    for (const value of foreignValues("new Map()")) {
      expect(isMap(value)).toBe(false);
      expect(lodashIsMap(value)).toBe(true);
    }
  });
});

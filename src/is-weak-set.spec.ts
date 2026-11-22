import { isWeakSet } from "@extremejs/utils";
import { isWeakSet as lodashIsWeakSet } from "lodash";
import { describe, expect, it } from "vitest";
import { builtInPredicatePrimitives, foreignValues, nonPrimitiveValues } from "#test";

it("should determine whether the provided value is a WeakSet object or not", () => {
  expect(isWeakSet(new WeakSet())).toBe(true);

  expect(isWeakSet(new Set())).toBe(false);
});

describe("lodash compatibility", () => {
  it("recognizes local weak sets", () => {
    const value = new WeakSet();

    expect(isWeakSet(value)).toBe(true);
    expect(lodashIsWeakSet(value)).toBe(true);
  });

  it("rejects nonmatching values", () => {
    for (const value of [
      ...builtInPredicatePrimitives,
      ...nonPrimitiveValues,
      new Set(),
    ]) {
      expect(isWeakSet(value)).toBe(false);
      expect(lodashIsWeakSet(value)).toBe(false);
    }
  });

  it("uses the local constructor for values from another realm", () => {
    for (const value of foreignValues("new WeakSet()")) {
      expect(isWeakSet(value)).toBe(false);
      expect(lodashIsWeakSet(value)).toBe(true);
    }
  });
});

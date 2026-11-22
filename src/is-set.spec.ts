import { isSet } from "@extremejs/utils";
import { isSet as lodashIsSet } from "lodash";
import { describe, expect, it } from "vitest";
import { builtInPredicatePrimitives, foreignValues, nonPrimitiveValues } from "#test";

it("should determine whether the provided value is a Set object or not", () => {
  expect(isSet(new Set())).toBe(true);

  expect(isSet(new WeakSet())).toBe(false);
});

describe("lodash compatibility", () => {
  it("recognizes local sets", () => {
    const value = new Set([1]);

    expect(isSet(value)).toBe(true);
    expect(lodashIsSet(value)).toBe(true);
  });

  it("rejects nonmatching values", () => {
    for (const value of [
      ...builtInPredicatePrimitives,
      ...nonPrimitiveValues,
      new WeakSet(),
      { constructor: false },
      { constructor: true },
    ]) {
      expect(isSet(value)).toBe(false);
      expect(lodashIsSet(value)).toBe(false);
    }
  });

  it("uses the local constructor for values from another realm", () => {
    for (const value of foreignValues("new Set()")) {
      expect(isSet(value)).toBe(false);
      expect(lodashIsSet(value)).toBe(true);
    }
  });
});

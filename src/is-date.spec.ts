import { isDate } from "@extremejs/utils";
import { isDate as lodashIsDate } from "lodash";
import { describe, expect, it } from "vitest";
import { builtInPredicatePrimitives, foreignValues, ordinaryFunctions, toArguments } from "#test";

it("should determine whether the provided value is a Date or not", () => {
  expect(isDate((new Date()))).toBe(true);

  expect(isDate(2)).toBe(false);
});

describe("lodash compatibility", () => {
  it("recognizes valid and invalid local dates", () => {
    for (const value of [new Date(0), new Date(Number.NaN)]) {
      expect(isDate(value)).toBe(true);
      expect(lodashIsDate(value)).toBe(true);
    }
  });

  it("rejects nonmatching values", () => {
    for (const value of [
      ...builtInPredicatePrimitives,
      ...ordinaryFunctions,
      [1, 2, 3],
      toArguments(1),
      new Error("example"),
      { a: 1 },
      /x/,
    ]) {
      expect(isDate(value)).toBe(false);
      expect(lodashIsDate(value)).toBe(false);
    }
  });

  it("uses the local constructor for values from another realm", () => {
    for (const value of foreignValues("new Date(0)")) {
      expect(isDate(value)).toBe(false);
      expect(lodashIsDate(value)).toBe(true);
    }
  });
});

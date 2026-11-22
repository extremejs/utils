import { isArguments } from "@extremejs/utils";
import { isArguments as lodashIsArguments } from "lodash";
import { describe, expect, it } from "vitest";
import { builtInPredicatePrimitives, foreignValues, ordinaryFunctions, toStrictArguments } from "#test";

it("should check if value is likely an arguments object", () => {
  // oxlint-disable-next-line unicorn/consistent-function-scoping -- Keep test fixtures local to each test.
  function fn(): IArguments {
    // oxlint-disable-next-line prefer-rest-params
    return arguments;
  }

  expect(isArguments(fn())).toBe(true);

  expect(isArguments([1, 2, 3])).toBe(false);
});

describe("lodash compatibility", () => {
  it("recognizes strict and non-strict arguments objects across realms", () => {
    for (const value of [
      toStrictArguments(1),
      ...foreignValues(
        "(function () { return arguments; })(1)",
        "(function () { 'use strict'; return arguments; })(1)",
      ),
    ]) {
      expect(isArguments(value)).toBe(true);
      expect(lodashIsArguments(value)).toBe(true);
    }
  });

  it("rejects arrays and records with arguments-like properties", () => {
    for (const value of [
      ...builtInPredicatePrimitives,
      ...ordinaryFunctions,
      [1, 2, 3],
      new Date(0),
      new Error("example"),
      /x/,
      {
        0     : 1,
        callee: Array.prototype.slice,
        length: 1,
      },
    ]) {
      expect(isArguments(value)).toBe(false);
      expect(lodashIsArguments(value)).toBe(false);
    }
  });
});

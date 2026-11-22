import { runInNewContext } from "node:vm";
import { isArray } from "@extremejs/utils";
import { isArray as lodashIsArray } from "lodash";
import { describe, expect, it } from "vitest";
import { ordinaryFunctions, ordinaryObjects } from "#test";

it("should determine whether the value is an array or not", () => {
  expect(isArray([])).toBe(true);

  // oxlint-disable-next-line unicorn/new-for-builtins -- Exercise the original constructor call and boxed value.
  expect(isArray(Array([]))).toBe(true);

  // oxlint-disable-next-line unicorn/no-new-array -- Exercise the Array constructor without changing the test input.
  expect(isArray(new Array([]))).toBe(true);

  expect(isArray({})).toBe(false);
});

describe("lodash compatibility", () => {
  it("recognizes arrays from either realm", () => {
    for (const value of [[], [1, 2, 3], runInNewContext("[1, 2, 3]") as unknown]) {
      expect(isArray(value)).toBe(true);
      expect(lodashIsArray(value)).toBe(true);
    }
  });

  it("rejects non-arrays including other indexed values", () => {
    for (const value of [
      ...ordinaryObjects,
      ...ordinaryFunctions,
      Object.create(Array.prototype) as unknown,
      null,
      void 0,
      false,
      true,
      0,
      1,
      Number.NaN,
      "",
      "a",
      Symbol("x"),
      {
        0     : 1,
        length: 1,
      },
      new Uint8Array(1),
    ]) {
      expect(isArray(value)).toBe(false);
      expect(lodashIsArray(value)).toBe(false);
    }
  });
});

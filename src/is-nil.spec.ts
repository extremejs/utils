import { isNil } from "@extremejs/utils";
import { isNil as lodashIsNil } from "lodash";
import { describe, expect, it } from "vitest";
import { foreignValues, nonPrimitiveValues } from "#test";

it("should determine whether the provided value is null/undefined or not", () => {
  expect(isNil(null)).toBe(true);

  expect(isNil(void 0)).toBe(true);
});

describe("lodash compatibility", () => {
  it("recognizes the accepted nullish values in either realm", () => {
    for (const value of [null, void 0, ...foreignValues("null", "undefined")]) {
      expect(isNil(value)).toBe(true);
      expect(lodashIsNil(value)).toBe(true);
    }
  });

  it("rejects other primitives, objects, and functions", () => {
    for (const value of [...nonPrimitiveValues, false, 0, Number.NaN, "", true, 1, "a", Symbol("x")]) {
      expect(isNil(value)).toBe(false);
      expect(lodashIsNil(value)).toBe(false);
    }
  });
});

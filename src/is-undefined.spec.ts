import { isUndefined } from "@extremejs/utils";
import { isUndefined as lodashIsUndefined } from "lodash";
import { describe, expect, it } from "vitest";
import { foreignValues, nonPrimitiveValues } from "#test";

it("should determine whether the provided value is undefined or not", () => {
  expect(isUndefined(void 0)).toBe(true);

  expect(isUndefined(null)).toBe(false);
});

describe("lodash compatibility", () => {
  it("recognizes the accepted nullish values in either realm", () => {
    for (const value of [void 0, ...foreignValues("undefined")]) {
      expect(isUndefined(value)).toBe(true);
      expect(lodashIsUndefined(value)).toBe(true);
    }
  });

  it("rejects other primitives, objects, and functions", () => {
    for (const value of [...nonPrimitiveValues, null, false, 0, Number.NaN, "", true, 1, "a", Symbol("x")]) {
      expect(isUndefined(value)).toBe(false);
      expect(lodashIsUndefined(value)).toBe(false);
    }
  });
});

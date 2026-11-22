import { isNull } from "@extremejs/utils";
import { isNull as lodashIsNull } from "lodash";
import { describe, expect, it } from "vitest";
import { foreignValues, nonPrimitiveValues } from "#test";

it("should determine whether the provided value is null or not", () => {
  expect(isNull(null)).toBe(true);

  expect(isNull(void 0)).toBe(false);
});

describe("lodash compatibility", () => {
  it("recognizes the accepted nullish values in either realm", () => {
    for (const value of [null, ...foreignValues("null")]) {
      expect(isNull(value)).toBe(true);
      expect(lodashIsNull(value)).toBe(true);
    }
  });

  it("rejects other primitives, objects, and functions", () => {
    for (const value of [...nonPrimitiveValues, void 0, false, 0, Number.NaN, "", true, 1, "a", Symbol("x")]) {
      expect(isNull(value)).toBe(false);
      expect(lodashIsNull(value)).toBe(false);
    }
  });
});

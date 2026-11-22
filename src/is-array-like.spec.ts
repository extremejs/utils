import { isArrayLike } from "@extremejs/utils";
import { isArrayLike as lodashIsArrayLike } from "lodash";
import { describe, expect, it } from "vitest";
import { arrayLikeObjects, nonArrayLikeValues } from "#test";

it("should check if value is array-like", () => {
  expect(isArrayLike([1, 2, 3])).toBe(true);

  expect(isArrayLike("abc")).toBe(true);

  expect(isArrayLike(() => 0)).toBe(false);
});

describe("lodash compatibility", () => {
  it("recognizes valid array-like values across realms", () => {
    for (const value of ["", "a", ...arrayLikeObjects()]) {
      expect(isArrayLike(value)).toBe(true);
      expect(lodashIsArrayLike(value)).toBe(true);
    }
  });

  it("rejects unsupported values and invalid lengths", () => {
    for (const value of nonArrayLikeValues) {
      expect(isArrayLike(value)).toBe(false);
      expect(lodashIsArrayLike(value)).toBe(false);
    }
  });

  it("excludes functions even when the function tag is shadowed", () => {
    const value = Object.defineProperty(Array.prototype.slice.bind([]), Symbol.toStringTag, { value: "Other" });

    expect(isArrayLike(value)).toBe(false);
    expect(lodashIsArrayLike(value)).toBe(true);
  });
});

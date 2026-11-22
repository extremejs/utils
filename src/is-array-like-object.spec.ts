import { isArrayLikeObject } from "@extremejs/utils";
import { isArrayLikeObject as lodashIsArrayLikeObject } from "lodash";
import { describe, expect, it } from "vitest";
import { arrayLikeObjects, nonArrayLikeValues } from "#test";

it("should check if value is an array-like object", () => {
  expect(isArrayLikeObject([1, 2, 3])).toBe(true);

  expect(isArrayLikeObject("abc")).toBe(false);

  expect(isArrayLikeObject(() => 0)).toBe(false);
});

describe("lodash compatibility", () => {
  it("recognizes valid array-like values across realms", () => {
    for (const value of arrayLikeObjects()) {
      expect(isArrayLikeObject(value)).toBe(true);
      expect(lodashIsArrayLikeObject(value)).toBe(true);
    }
  });

  it("rejects unsupported values and invalid lengths", () => {
    for (const value of [...nonArrayLikeValues, "", "a"]) {
      expect(isArrayLikeObject(value)).toBe(false);
      expect(lodashIsArrayLikeObject(value)).toBe(false);
    }
  });

  it("accepts objects with a valid length even when their tag says Function", () => {
    const value = Object.defineProperty({ length: 1 }, Symbol.toStringTag, { value: "Function" });

    expect(isArrayLikeObject(value)).toBe(true);
    expect(lodashIsArrayLikeObject(value)).toBe(false);
  });
});

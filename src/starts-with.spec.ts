import { startsWith } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

it("should check whether the string starts with the given searchString", () => {
  expect(startsWith("012345", "012")).toBe(true);

  expect(startsWith("012345", "12")).toBe(false);

  expect(startsWith("012345", "234", 2)).toBe(true);
});

describe("lodash compatibility", () => {
  it("checks the default position and is case sensitive", () => {
    expect(startsWith("abc", "a")).toBe(true);
    expect(lodash.startsWith("abc", "a")).toBe(true);
    expect(startsWith("abc", "b")).toBe(false);
    expect(lodash.startsWith("abc", "b")).toBe(false);
    expect(startsWith("abc", "A")).toBe(false);
    expect(lodash.startsWith("abc", "A")).toBe(false);
  });

  it.each([
    ["b", 1, true],
    ["bc", 1.2, true],
    ["a", 0, true],
    ["a", Number.NaN, true],
    ["a", -1, true],
    ["a", -Infinity, true],
    ["a", 3, false],
    ["a", 5, false],
    ["a", Number.MAX_SAFE_INTEGER, false],
    ["a", Infinity, false],
  ])("checks %j at numeric position %s", (target, position, expected) => {
    expect(startsWith("abc", target, position)).toBe(expected);
    expect(lodash.startsWith("abc", target, position)).toBe(expected);
    expect(startsWith("abc", "", position)).toBe(true);
    expect(lodash.startsWith("abc", "", position)).toBe(true);
  });

  it("interprets positions as UTF-16 offsets", () => {
    expect(startsWith("🚀ab", "a", 2)).toBe(true);
    expect(lodash.startsWith("🚀ab", "a", 2)).toBe(true);
  });
});

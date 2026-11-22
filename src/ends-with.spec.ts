import { endsWith } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

it("should check whether the string ends with the given searchString", () => {
  expect(endsWith("012345", "345")).toBe(true);

  expect(endsWith("012345", "34")).toBe(false);

  expect(endsWith("012345", "123", 4)).toBe(true);
});

describe("lodash compatibility", () => {
  it("checks the default position and is case sensitive", () => {
    expect(endsWith("abc", "c")).toBe(true);
    expect(lodash.endsWith("abc", "c")).toBe(true);
    expect(endsWith("abc", "b")).toBe(false);
    expect(lodash.endsWith("abc", "b")).toBe(false);
    expect(endsWith("abc", "C")).toBe(false);
    expect(lodash.endsWith("abc", "C")).toBe(false);
  });

  it.each([
    ["b", 2, true],
    ["ab", 2.2, true],
    ["c", 0, false],
    ["c", Number.NaN, false],
    ["c", -1, false],
    ["c", -Infinity, false],
    ["c", 3, true],
    ["c", 5, true],
    ["c", Number.MAX_SAFE_INTEGER, true],
    ["c", Infinity, true],
  ])("checks %j at numeric position %s", (target, position, expected) => {
    expect(endsWith("abc", target, position)).toBe(expected);
    expect(lodash.endsWith("abc", target, position)).toBe(expected);
    expect(endsWith("abc", "", position)).toBe(true);
    expect(lodash.endsWith("abc", "", position)).toBe(true);
  });

  it("interprets positions as UTF-16 offsets", () => {
    expect(endsWith("🚀ab", "🚀", 2)).toBe(true);
    expect(lodash.endsWith("🚀ab", "🚀", 2)).toBe(true);
  });
});

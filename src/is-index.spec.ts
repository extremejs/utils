import { isIndex, noop } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should check if value is a valid array-like index", () => {
  expect(isIndex(0)).toBe(true);

  expect(isIndex(10)).toBe(true);

  expect(isIndex("10")).toBe(true);

  expect(isIndex("foo")).toBe(false);

  expect(isIndex(true)).toBe(false);

  expect(isIndex(noop)).toBe(false);
});

// Boundary cases from Lodash's private isIndex suite, exercised through the public ExtremeJS export.
it.each([
  [0, true],
  ["0", true],
  ["1", true],
  [Number.MAX_SAFE_INTEGER - 1, true],
  ["1abc", false],
  ["07", false],
  ["0001", false],
  [-1, false],
  [1.1, false],
  [Number.MAX_SAFE_INTEGER, false],
  [Symbol("0"), false],
] as const)("should classify %s with the default bound", (value, expected) => {
  expect(isIndex(value)).toBe(expected);
});

it.each([
  [3, 4, true],
  [3, 3, false],
  [0, 0, false],
])("should classify %s with the exclusive upper bound %s", (value, length, expected) => {
  expect(isIndex(value, length)).toBe(expected);
});

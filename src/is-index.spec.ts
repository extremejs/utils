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
  ["1\n", false],
  ["-0", false],
  ["+1", false],
  ["1e1", false],
  [1n, false],
  [[1], false],
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

it("should reject objects without coercing them", () => {
  const candidate = {
    [Symbol.toPrimitive](): never {
      throw new Error("must not coerce");
    },
  };

  expect(isIndex(candidate)).toBe(false);
});

it("should compare decimal indices exactly when the bound exceeds the safe integer range", () => {
  expect(isIndex("9007199254740995", 9_007_199_254_740_996)).toBe(true);
  expect(isIndex("9007199254740996", 9_007_199_254_740_996)).toBe(false);
});

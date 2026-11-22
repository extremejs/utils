import { isRegExp } from "@extremejs/utils";
import { isRegExp as lodashIsRegExp } from "lodash";
import { describe, expect, it } from "vitest";
import { builtInPredicatePrimitives, foreignValues, ordinaryFunctions, toArguments } from "#test";

it("should determine whether the provided value is a RegExp object or not", () => {
  expect(isRegExp(/abc/)).toBe(true);

  expect(isRegExp("/abc/")).toBe(false);

  expect(isRegExp(2)).toBe(false);
});

describe("lodash compatibility", () => {
  it("recognizes literals and constructed regular expressions", () => {
    // oxlint-disable-next-line prefer-regex-literals -- Cover the upstream constructor case as well as the literal.
    for (const value of [/x/, new RegExp("x", "i")]) {
      expect(isRegExp(value)).toBe(true);
      expect(lodashIsRegExp(value)).toBe(true);
    }
  });

  it("rejects nonmatching values", () => {
    for (const value of [
      ...builtInPredicatePrimitives,
      ...ordinaryFunctions,
      [1, 2, 3],
      toArguments(1),
      new Date(0),
      new Error("example"),
      { a: 1 },
      "/x/",
    ]) {
      expect(isRegExp(value)).toBe(false);
      expect(lodashIsRegExp(value)).toBe(false);
    }
  });

  it("uses the local constructor for values from another realm", () => {
    for (const value of foreignValues("/x/")) {
      expect(isRegExp(value)).toBe(false);
      expect(lodashIsRegExp(value)).toBe(true);
    }
  });
});

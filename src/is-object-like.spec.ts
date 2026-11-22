import { isObjectLike } from "@extremejs/utils";
import { isObjectLike as lodashIsObjectLike } from "lodash";
import { describe, expect, it } from "vitest";
import { boxedValues, foreignValues, ordinaryFunctions, ordinaryObjects } from "#test";

it("should check if value is object-like", () => {
  expect(isObjectLike({})).toBe(true);

  expect(isObjectLike([1, 2, 3])).toBe(true);

  expect(isObjectLike(() => 0)).toBe(false);

  expect(isObjectLike(null)).toBe(false);

  expect(isObjectLike(2)).toBe(false);
});

describe("lodash compatibility", () => {
  it("recognizes ordinary objects and boxed primitives", () => {
    for (const value of [
      ...ordinaryObjects,
      [1, 2, 3],
      ...boxedValues,
      Object.create(null) as unknown,
    ]) {
      expect(isObjectLike(value)).toBe(true);
      expect(lodashIsObjectLike(value)).toBe(true);
    }
  });

  it("rejects values outside the object contract", () => {
    for (const value of [null, void 0, false, 0, Number.NaN, "", true, 1, "a", Symbol("x"), ...ordinaryFunctions]) {
      expect(isObjectLike(value)).toBe(false);
      expect(lodashIsObjectLike(value)).toBe(false);
    }
  });

  it("recognizes objects in another realm", () => {
    for (const value of foreignValues("Object(false)", "new Date(0)", "Object(1)", "({})", "/x/", 'Object("a")')) {
      expect(isObjectLike(value)).toBe(true);
      expect(lodashIsObjectLike(value)).toBe(true);
    }
  });
});

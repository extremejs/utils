import { isObject } from "@extremejs/utils";
import { isObject as lodashIsObject } from "lodash";
import { describe, expect, it } from "vitest";
import { boxedValues, foreignValues, nonPrimitiveValues } from "#test";

it("should determine whether the provided value is an Object or not", () => {
  expect(isObject({})).toBe(true);

  expect(isObject([1, 2, 3])).toBe(true);

  expect(isObject(() => 0)).toBe(true);

  expect(isObject(null)).toBe(false);

  expect(isObject(2)).toBe(false);
});

describe("lodash compatibility", () => {
  it("recognizes ordinary objects and boxed primitives", () => {
    for (const value of [...nonPrimitiveValues, ...boxedValues]) {
      expect(isObject(value)).toBe(true);
      expect(lodashIsObject(value)).toBe(true);
    }
  });

  it("rejects values outside the object contract", () => {
    for (const value of [null, void 0, false, 0, Number.NaN, "", true, 1, "a", Symbol("x")]) {
      expect(isObject(value)).toBe(false);
      expect(lodashIsObject(value)).toBe(false);
    }
  });

  it("includes null-prototype objects and foreign objects and functions", () => {
    const objects = foreignValues("Object(false)", "new Date(0)", "Object(1)", "({})", "/x/", 'Object("a")', "() => 0");

    for (const value of [Object.create(null) as unknown, ...objects]) {
      expect(isObject(value)).toBe(true);
      expect(lodashIsObject(value)).toBe(true);
    }
  });
});

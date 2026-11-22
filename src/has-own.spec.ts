import { hasOwn } from "@extremejs/utils";
import { has as lodashHas } from "lodash";
import { describe, expect, it } from "vitest";
import { toArguments } from "#test";

it("should checks if value has the specified key as its own property", () => {
  expect(hasOwn({ a: 2 }, "a")).toBe(true);
});

describe("lodash compatibility", () => {
  it("checks own keys regardless of value, enumerability, or a shadowed hasOwnProperty", () => {
    const token = Symbol("token");
    const value = {
      a             : void 0,
      hasOwnProperty: null,
    };
    Object.setPrototypeOf(value, { inherited: true });
    Object.defineProperty(value, token, { value: 2 });

    for (const key of ["a", token]) {
      expect(hasOwn(value, key)).toBe(true);
      expect(lodashHas(value, key)).toBe(true);
    }

    for (const key of ["inherited", "missing"]) {
      expect(hasOwn(value, key)).toBe(false);
      expect(lodashHas(value, key)).toBe(false);
    }
  });

  it("handles numeric array and arguments keys", () => {
    for (const value of [[1, 2, 3], toArguments(1, 2, 3)]) {
      expect(hasOwn(value, 1)).toBe(true);
      expect(lodashHas(value, 1)).toBe(true);
    }
  });

  it("checks for a getter without invoking it", () => {
    const value = Object.defineProperty({}, "a", {
      get() {
        throw new Error("accessed a");
      },
    });

    expect(hasOwn(value, "a")).toBe(true);
    expect(() => lodashHas(value, ["a"])).toThrow("accessed a");
  });

  it("checks a literal key while Lodash can traverse an own path", () => {
    const literal = { "a.b": 1 };
    const nested = { a: { b: 2 } };

    expect(hasOwn(literal, "a.b")).toBe(true);
    expect(lodashHas(literal, ["a.b"])).toBe(true);
    expect(hasOwn(nested, "a.b")).toBe(false);
    expect(lodashHas(nested, "a.b")).toBe(true);
    expect(lodashHas(nested, ["a.b"])).toBe(false);
  });

  it("excludes sparse holes and normalizes negative zero to the zero key", () => {
    const sparse = [1];
    sparse[2] = 3;
    const sparseArgs = toArguments(1, 2, 3);
    Reflect.deleteProperty(sparseArgs, "1");

    for (const value of [sparse, sparseArgs]) {
      expect(hasOwn(value, 1)).toBe(false);
      expect(lodashHas(value, 1)).toBe(true);
    }

    expect(hasOwn({ 0: true }, -0)).toBe(true);
    expect(lodashHas({ 0: true }, -0)).toBe(false);
  });
});

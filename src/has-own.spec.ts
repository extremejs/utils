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

  it("traverses string paths and uses explicit segments for literal keys", () => {
    const value = {
      "a.b" : 1,
      "a[c]": 3,
      "a"   : { b: void 0 },
      ""    : 4,
    };

    expect(hasOwn(value, "a.b")).toBe(lodashHas(value, ["a", "b"]));
    expect(hasOwn(value, "a[c]")).toBe(false);
    expect(lodashHas(value, "a[c]")).toBe(true);
    expect(hasOwn(value, ["a.b"])).toBe(lodashHas(value, ["a.b"]));
    expect(hasOwn(value, ["a[c]"])).toBe(lodashHas(value, ["a[c]"]));
    expect(hasOwn(value, [""])).toBe(lodashHas(value, [""]));
    expect(hasOwn(value, "")).toBe(true);
    expect(hasOwn(value, [])).toBe(lodashHas(value, []));
  });

  it("requires an own property at every segment", () => {
    class Entry {

      public branch: object = Object.create({ leaf: true });

      public get inherited(): object {
        throw new Error(`inherited getter for ${ this.constructor.name }`);
      }

    }

    const entries = Array.from({ length: 2 });
    Reflect.deleteProperty(entries, "0");
    const value = Object.assign(new Entry(), {
      entries,
      missing: null,
    });

    expect(hasOwn(value, "inherited.leaf")).toBe(false);
    expect(hasOwn(value, ["branch", "leaf"])).toBe(false);
    expect(hasOwn(value, ["missing", "leaf"])).toBe(false);
    expect(hasOwn(value, "entries[0]")).toBe(false);
    expect(lodashHas(value, "entries[0]")).toBe(true);
    expect(hasOwn(value, ["entries", 1])).toBe(true);
  });

  it("reads an intermediate getter once and leaves the final getter untouched", () => {
    let accesses = 0;
    const value = {
      get a() {
        accesses++;

        return {
          get b(): never {
            throw new Error("accessed b");
          },
        };
      },
    };

    expect(hasOwn(value, ["a", "b"])).toBe(true);
    expect(accesses).toBe(1);
    expect(() => hasOwn(value, "a.b.c")).toThrow("accessed b");
    expect(() => lodashHas(value, ["a", "b"])).toThrow("accessed b");
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

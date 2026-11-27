import { property } from "@extremejs/utils";
import { property as lodashProperty } from "lodash";
import { describe, expect, expectTypeOf, it } from "vitest";

function readChoice(key: "a" | "missing"): number | string {
  const read = property([key], "fallback");
  const result = read({ a: 1 });
  expectTypeOf(result).toEqualTypeOf<number | string>();

  return result;
}

it("should return value of the provided direct property", () => {
  const fn = property("foo");
  const obj = { foo: "bar" };

  expect(fn(obj)).toEqual(obj.foo);
});

it("should return value of the provided nested property", () => {
  const fn = property("foo.bar");
  const obj = { foo: { bar: "baz" } };

  expect(fn(obj)).toEqual(obj.foo.bar);
});

it("should return the fallback value", () => {
  const fallback = "baz";
  const fn = property("foo.bar", fallback);
  const obj = { foo: "bar" };

  expect(fn(obj)).toEqual(fallback);
});

describe("lodash compatibility", () => {
  it("keeps the fallback type when some segments can be missing", () => {
    const value: Record<string, number> = {};
    const result = property("missing", "fallback")(value);

    expect(result).toBe("fallback");
    expectTypeOf(result).toEqualTypeOf<number | string>();
    expect(readChoice("a")).toBe(1);
    expect(readChoice("missing")).toBe("fallback");
  });

  it("reads explicit segments and substitutes the captured fallback through nullable segments", () => {
    const value = { "a.b": [{ "[score]": 2 }, null] };
    const fromPath = property(["a.b", 0, "[score]"])(value);
    const missing = property(["a.b", 1, "[score]"], null)(value);

    expect(fromPath).toBe(lodashProperty<typeof value, number>(["a.b", 0, "[score]"])(value));
    expect(missing).toBeNull();
    const readEmpty: (input: typeof value) => unknown = property([]);
    expect(readEmpty(value)).toBeUndefined();
    expectTypeOf(fromPath).toEqualTypeOf<number | undefined>();
    expectTypeOf(missing).toEqualTypeOf<number | null>();
  });

  it("creates unary accessors for direct, deep, inherited, and numeric keys", () => {
    class Entry {

      public own = 3;

      public get inherited(): number {
        return this.own;
      }

    }

    const token = Symbol("token");
    const value = Object.assign(new Entry(), {
      a      : [{ b: 2 }],
      [token]: 4,
    });
    const read = property("a");
    const lodashRead = lodashProperty<typeof value, typeof value.a>("a");

    expect(read.length).toBe(lodashRead.length);
    expect(read(value)).toBe(lodashRead(value));
    expect(property("a[0].b")(value)).toBe(lodashProperty<typeof value, number>("a[0].b")(value));
    expect(property("inherited")(value)).toBe(lodashProperty<typeof value, number>("inherited")(value));
    expect(property(token)(value)).toBe(lodashProperty<typeof value, number>(token)(value));
    expect(property(1)([1, 2, 3])).toBe(lodashProperty<number[], number>(1)([1, 2, 3]));
  });

  it("captures a fallback for missing or nullish values", () => {
    const read = property("a.b", 0);
    const lodashRead = lodashProperty<object, unknown>("a.b");

    expect(read({})).toBe(0);
    expect(lodashRead({})).toBeUndefined();
    expect(read({ a: { b: null } })).toBe(0);
    expect(lodashRead({ a: { b: null } })).toBeNull();
  });

  it("parses dotted paths and uses native key conversion for signed zero", () => {
    const dottedKey = "a.b";
    const negativeZero = "-0";
    const value = {
      [dottedKey]   : 1,
      a             : { b: 2 },
      0             : "zero",
      [negativeZero]: "negative zero",
    };

    expect(property("a.b")(value)).toBe(2);
    expect(lodashProperty<typeof value, number>("a.b")(value)).toBe(1);
    expect(property(-0)(value)).toBe("zero");
    expect(lodashProperty<typeof value, string>(-0)(value)).toBe("negative zero");
    expect(property(0)(value)).toBe(lodashProperty<typeof value, string>(0)(value));
  });
});

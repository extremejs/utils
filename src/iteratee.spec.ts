import { iteratee } from "@extremejs/utils";
import { iteratee as lodashIteratee } from "lodash";
import { describe, expect, it } from "vitest";

describe("with property as iteratee", () => {
  it("should return value of the provided direct property", () => {
    const fn = iteratee("foo");
    const obj = { foo: "bar" };

    expect(fn(obj)).toEqual(obj.foo);
  });

  it("should return value of the provided nested property", () => {
    const fn = iteratee("foo.bar");
    const obj = { foo: { bar: "baz" } };

    expect(fn(obj)).toEqual(obj.foo.bar);
  });

  it("should return the fallback value", () => {
    const fallback = "baz";
    const fn = iteratee("foo.bar", fallback);
    const obj = { foo: "bar" };

    expect(fn(obj)).toEqual(fallback);
  });
});

describe("with function as iteratee", () => {
  it("should return value of the provided direct property", () => {
    const fn = iteratee((value: { foo: string; }) => value.foo);
    const obj = { foo: "bar" };

    expect(fn(obj)).toEqual(obj.foo);
  });

  it("should return value of the provided nested property", () => {
    const fn = iteratee((value: { foo: { bar: string; }; }) => value.foo.bar);
    const obj = { foo: { bar: "baz" } };

    expect(fn(obj)).toEqual(obj.foo.bar);
  });

  it("should ignore the fallback value", () => {
    // Exercise an ignored fallback with the original input.
    // oxlint-disable-next-line typescript/no-explicit-any typescript/no-unsafe-type-assertion
    const fn = iteratee((value: { foo: any; }) => value.foo.bar, "baz" as never);
    const obj = { foo: "bar" };

    expect(fn(obj)).toBeUndefined();
  });
});

function select(this: { offset: number; }, first: number, ...rest: number[]): number[] {
  return [this.offset, first, ...rest];
}

describe("lodash compatibility", () => {
  it("preserves the callback identity, arguments, and receiver", () => {
    const local = iteratee(select);
    const upstream = lodashIteratee(select);
    const receiver = { offset: 1 };

    expect(local).toBe(select);
    expect(upstream).toBe(select);
    expect(local.call(receiver, 2, 3, 4)).toStrictEqual([1, 2, 3, 4]);
    expect(upstream.call(receiver, 2, 3, 4)).toStrictEqual([1, 2, 3, 4]);
  });

  it("reads direct, indexed, and nested property shorthands", () => {
    const value = { a: [{ b: 2 }] };
    const array = ["value"];

    expect(iteratee("a")(value)).toBe(lodashIteratee("a")(value));
    expect(iteratee("a[0].b")(value)).toBe(lodashIteratee("a[0].b")(value));
    expect(iteratee("0")(array)).toBe(lodashIteratee("0")(array));
  });

  it("uses the local path and fallback rules for property shorthands", () => {
    const dottedKey = "a.b";
    const value = {
      [dottedKey]: 1,
      a          : { b: 2 },
    };

    expect(iteratee("a.b")(value)).toBe(2);
    expect(lodashIteratee("a.b")(value)).toBe(1);
    expect(iteratee("a.b", 0)({ a: { b: null } })).toBe(0);
    expect(lodashIteratee("a.b")({ a: { b: null } })).toBeNull();
    expect(iteratee("a.b", 0)({})).toBe(0);
    expect(lodashIteratee("a.b")({})).toBeUndefined();
  });
});

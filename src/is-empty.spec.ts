// oxlint-disable unicorn/consistent-function-scoping
import { MAX_SAFE_INTEGER, isEmpty } from "@extremejs/utils";
import { isEmpty as lodashIsEmpty } from "lodash";
import { describe, expect, it } from "vitest";
import { foreignValues, toArguments } from "#test";

describe("checks if the provided value is an empty array, string, object, map, or set", () => {
  it.each([[], {}, null, void 0, false, 0, Number.NaN, "", Buffer.alloc(0)])("should return true for %p", (value) => {
    expect(isEmpty(value)).toBe(true);
  });

  it.each([[0], { a: 0 }, "a"])("should return false for %p", (value) => {
    expect(isEmpty(value)).toBe(false);
  });

  it("should work with an object that has a length property", () => {
    expect(isEmpty({ length: 0 })).toBe(false);
  });

  it("should work with arguments objects", () => {
    // oxlint-disable-next-line typescript/no-unused-vars
    function fn(...args: unknown[]): IArguments {
      // oxlint-disable-next-line prefer-rest-params
      return arguments;
    }

    expect(isEmpty(fn())).toBe(true);

    expect(isEmpty(fn(1))).toBe(false);
    expect(isEmpty(fn(1, 2))).toBe(false);
  });

  it("should work with prototype objects", () => {
    function Fn(): void {
      /* empty */
    }

    Fn.prototype = { constructor: Fn };

    expect(isEmpty(Fn.prototype)).toBe(true);

    // oxlint-disable-next-line typescript/ban-ts-comment
    // @ts-expect-error
    Fn.prototype.a = 2;

    expect(isEmpty(Fn.prototype)).toBe(false);
  });

  it("should work with jQuery/MooTools DOM query collections", () => {
    function Fn(this: unknown, elements: unknown[]): void {
      Array.prototype.push.apply(this, elements);
    }

    Fn.prototype = {
      length: 0,
      splice: Array.prototype.splice,
    };

    // oxlint-disable-next-line typescript/ban-ts-comment
    // @ts-expect-error
    expect(isEmpty(new Fn([]))).toBe(true);
  });

  it("should work with map", () => {
    const map = new Map();

    expect(isEmpty(map)).toBe(true);

    map.set("a", 2);

    expect(isEmpty(map)).toBe(false);

    map.clear();

    expect(isEmpty(map)).toBe(true);
  });

  it("should work with set", () => {
    const set = new Set();

    expect(isEmpty(set)).toBe(true);

    set.add(2);

    expect(isEmpty(set)).toBe(false);

    set.clear();

    expect(isEmpty(set)).toBe(true);
  });

  it("should not treat objects with negative lengths as array-like", () => {
    function Fn(): void {
      /* empty */
    }

    Fn.prototype.length = -1;

    // oxlint-disable-next-line typescript/ban-ts-comment
    // @ts-expect-error
    expect(isEmpty(new Fn())).toBe(true);
  });

  it("should not treat objects with lengths larger than MAX_SAFE_INTEGER as array-like", () => {
    function Fn(): void {
      /* empty */
    }

    Fn.prototype.length = MAX_SAFE_INTEGER + 1;

    // oxlint-disable-next-line typescript/ban-ts-comment
    // @ts-expect-error
    expect(isEmpty(new Fn())).toBe(true);
  });

  it("should not treat objects with non-number lengths as array-like", () => {
    expect(isEmpty({ length: "0" })).toBe(false);
  });
});

describe("lodash compatibility", () => {
  it("checks nullish values, primitives, arrays, and indexed built-ins", () => {
    const sparse = [0];
    Reflect.deleteProperty(sparse, "0");

    for (const value of [
      ...foreignValues("new Map()", "new Set()"),
      [],
      {},
      null,
      void 0,
      false,
      true,
      0,
      1,
      Number.NaN,
      "",
      /x/,
      Symbol("x"),
      Array.prototype.slice,
      Buffer.alloc(0),
      new Uint8Array(0),
      toArguments(),
    ]) {
      expect(isEmpty(value)).toBe(true);
      expect(lodashIsEmpty(value)).toBe(true);
    }

    for (const value of [
      [0],
      sparse,
      "a",
      Buffer.alloc(1),
      new Uint8Array(1),
      toArguments(1),
      ...foreignValues("new Map([[1, 2]])", "new Set([1])"),
    ]) {
      expect(isEmpty(value)).toBe(false);
      expect(lodashIsEmpty(value)).toBe(false);
    }
  });

  it("checks own enumerable string keys on ordinary records", () => {
    const value = {};
    Object.setPrototypeOf(value, { inherited: true });
    Object.defineProperty(value, "hidden", { value: true });
    Object.assign(value, { [Symbol("token")]: true });

    expect(isEmpty(value)).toBe(true);
    expect(lodashIsEmpty(value)).toBe(true);

    Object.assign(value, { own: void 0 });
    expect(isEmpty(value)).toBe(false);
    expect(lodashIsEmpty(value)).toBe(false);
  });

  it("ignores the constructor key on a constructor prototype", () => {
    class Example {}
    const value = Example.prototype;
    Object.defineProperty(value, "constructor", { enumerable: true });

    expect(isEmpty(value)).toBe(true);
    expect(lodashIsEmpty(value)).toBe(true);

    Object.assign(value, { a: 1 });
    expect(isEmpty(value)).toBe(false);
    expect(lodashIsEmpty(value)).toBe(false);
  });

  it("uses length for splice collections and keys for other array-like records", () => {
    const emptyCollection = {
      length: 0,
      splice: Array.prototype.splice,
    };
    const populatedCollection = {
      length: 1,
      splice: Array.prototype.splice,
    };

    for (const value of [
      emptyCollection,
      Object.create({
        length: -1,
        splice: Array.prototype.splice,
      }) as unknown,
      Object.create({
        length: Number.MAX_SAFE_INTEGER + 1,
        splice: Array.prototype.splice,
      }) as unknown,
    ]) {
      expect(isEmpty(value)).toBe(true);
      expect(lodashIsEmpty(value)).toBe(true);
    }

    for (const value of [populatedCollection, { length: 0 }, { length: "0" }, { a: 0 }]) {
      expect(isEmpty(value)).toBe(false);
      expect(lodashIsEmpty(value)).toBe(false);
    }
  });

  it("checks the size of maps and sets as entries are added and removed", () => {
    const map = new Map<string, number>();
    const set = new Set<number>();

    expect(isEmpty(map)).toBe(true);
    expect(lodashIsEmpty(map)).toBe(true);
    expect(isEmpty(set)).toBe(true);
    expect(lodashIsEmpty(set)).toBe(true);

    map.set("a", 1);
    set.add(1);
    expect(isEmpty(map)).toBe(false);
    expect(lodashIsEmpty(map)).toBe(false);
    expect(isEmpty(set)).toBe(false);
    expect(lodashIsEmpty(set)).toBe(false);

    map.clear();
    set.clear();
    expect(isEmpty(map)).toBe(true);
    expect(lodashIsEmpty(map)).toBe(true);
    expect(isEmpty(set)).toBe(true);
    expect(lodashIsEmpty(set)).toBe(true);
  });

  it("checks a boxed string by length even with an extra enumerable key", () => {
    // oxlint-disable-next-line unicorn/new-for-builtins -- Exercise the boxed-string length branch.
    const value: unknown = Object.assign(Object(""), { extra: true });

    expect(isEmpty(value)).toBe(true);
    expect(lodashIsEmpty(value)).toBe(false);
  });
});

it("checks intrinsic collection size even when the size property is shadowed", () => {
  const [map, set] = foreignValues(
    "Object.defineProperty(new Map([[1, 2]]), 'size', { value: 0 })",
    "Object.defineProperty(new Set(), 'size', { value: 1 })",
  );

  expect(isEmpty(map)).toBe(false);
  expect(lodashIsEmpty(map)).toBe(true);
  expect(isEmpty(set)).toBe(true);
  expect(lodashIsEmpty(set)).toBe(false);
});

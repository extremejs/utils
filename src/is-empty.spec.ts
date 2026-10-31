// oxlint-disable unicorn/consistent-function-scoping
import { MAX_SAFE_INTEGER, isEmpty } from "@extremejs/utils";
import { describe, expect, it } from "vitest";

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

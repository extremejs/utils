import { runInNewContext } from "node:vm";
import { isFunction } from "@extremejs/utils";
import { isFunction as lodashIsFunction } from "lodash";
import { describe, expect, it } from "vitest";
import { asyncFunction, asyncGenerator, generator, ordinaryFunctions, ordinaryObjects } from "#test";

it("should determine whether the provided value is a function or not", () => {
  expect(isFunction(() => 0)).toBe(true);

  expect(isFunction(2)).toBe(false);
});

describe("lodash compatibility", () => {
  it("recognizes functions, classes, proxies, and view constructors", () => {
    const values = [
      ...ordinaryFunctions,
      asyncFunction,
      generator,
      Proxy,
      new Proxy(Array.prototype.slice, {}),
      class Example {},
      Int8Array,
      Uint8Array,
      Uint8ClampedArray,
      Int16Array,
      Uint16Array,
      Int32Array,
      Uint32Array,
      Float16Array,
      Float32Array,
      Float64Array,
      BigInt64Array,
      BigUint64Array,
      DataView,
      runInNewContext("() => 0") as unknown,
    ];

    for (const value of values) {
      expect(isFunction(value)).toBe(true);
      expect(lodashIsFunction(value)).toBe(true);
    }
  });

  it("rejects values that are not functions", () => {
    for (const value of [
      ...ordinaryObjects,
      Object.create(Function.prototype) as unknown,
      [1, 2, 3],
      null,
      void 0,
      false,
      0,
      Number.NaN,
      "",
      true,
      1,
      "a",
      Symbol("x"),
    ]) {
      expect(isFunction(value)).toBe(false);
      expect(lodashIsFunction(value)).toBe(false);
    }
  });

  it("uses typeof even when a function's tag is shadowed", () => {
    const value = Object.defineProperty(Array.prototype.slice.bind([]), Symbol.toStringTag, { value: "Other" });

    expect(isFunction(value)).toBe(true);
    expect(lodashIsFunction(value)).toBe(false);
  });

  it("recognizes async generators through typeof", () => {
    expect(isFunction(asyncGenerator)).toBe(true);
    expect(lodashIsFunction(asyncGenerator)).toBe(false);
  });
});

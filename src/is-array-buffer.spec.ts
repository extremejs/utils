import { isArrayBuffer } from "@extremejs/utils";
import { isArrayBuffer as lodashIsArrayBuffer } from "lodash";
import { describe, expect, it } from "vitest";
import { builtInPredicatePrimitives, foreignValues, nonPrimitiveValues } from "#test";

it("should check if value is an ArrayBuffer object", () => {
  expect(isArrayBuffer(new ArrayBuffer(2))).toBe(true);

  // oxlint-disable-next-line unicorn/no-new-array -- Exercise the Array constructor without changing the test input.
  expect(isArrayBuffer(new Array(2))).toBe(false);
});

describe("lodash compatibility", () => {
  it("recognizes local array buffers", () => {
    const value = new ArrayBuffer(8);

    expect(isArrayBuffer(value)).toBe(true);
    expect(lodashIsArrayBuffer(value)).toBe(true);
  });

  it("rejects nonmatching values", () => {
    for (const value of [
      ...builtInPredicatePrimitives,
      ...nonPrimitiveValues,
      new Uint8Array(8),
      new DataView(new ArrayBuffer(8)),
      new SharedArrayBuffer(8),
    ]) {
      expect(isArrayBuffer(value)).toBe(false);
      expect(lodashIsArrayBuffer(value)).toBe(false);
    }
  });

  it("uses the local constructor for values from another realm", () => {
    for (const value of foreignValues("new ArrayBuffer(8)")) {
      expect(isArrayBuffer(value)).toBe(false);
      expect(lodashIsArrayBuffer(value)).toBe(true);
    }
  });
});

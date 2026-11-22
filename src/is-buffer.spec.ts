import { isBuffer } from "@extremejs/utils";
import { isBuffer as lodashIsBuffer } from "lodash";
import { describe, expect, it } from "vitest";
import { builtInPredicatePrimitives, nonPrimitiveValues } from "#test";

it("should determine whether the provided value is a Buffer or not", () => {
  expect(isBuffer(Buffer.from([2]))).toBe(true);

  expect(isBuffer(Uint8Array.from([2]))).toBe(false);
});

describe("lodash compatibility", () => {
  it("recognizes Node.js buffers", () => {
    const value = Buffer.alloc(8);

    expect(isBuffer(value)).toBe(true);
    expect(lodashIsBuffer(value)).toBe(true);
  });

  it("rejects nonmatching values", () => {
    for (const value of [
      ...builtInPredicatePrimitives,
      ...nonPrimitiveValues,
      new Uint8Array(8),
      new ArrayBuffer(8),
      new DataView(new ArrayBuffer(8)),
    ]) {
      expect(isBuffer(value)).toBe(false);
      expect(lodashIsBuffer(value)).toBe(false);
    }
  });
});

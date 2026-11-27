import { isBuffer, isEmpty, keys } from "@extremejs/utils";
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

it("works with keys and isEmpty when the global Buffer binding is absent", () => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, "Buffer");

  if (descriptor === void 0) throw new Error("Expected Node.js to provide Buffer");

  Reflect.deleteProperty(globalThis, "Buffer");

  let results: unknown;
  try {
    results = [
      isBuffer(new Uint8Array(1)),
      keys("hi"),
      keys(new Uint8Array(1)),
      isEmpty({ length: 0 }),
      isEmpty(new Uint8Array(0)),
    ];
  } finally {
    Object.defineProperty(globalThis, "Buffer", descriptor);
  }

  expect(results).toEqual([false, ["0", "1"], ["0"], false, true]);
});

it("rejects prototype-only stand-ins accepted by the host Buffer check", () => {
  const value: unknown = Object.create(Buffer.prototype);

  expect(isBuffer(value)).toBe(false);
  expect(lodashIsBuffer(value)).toBe(true);

  const wrongView = new Uint16Array(2);
  Object.setPrototypeOf(wrongView, Buffer.prototype);
  expect(isBuffer(wrongView)).toBe(false);
  expect(lodashIsBuffer(wrongView)).toBe(true);
});

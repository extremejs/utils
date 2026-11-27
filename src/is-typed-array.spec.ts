import { isTypedArray } from "@extremejs/utils";
import { isTypedArray as lodashIsTypedArray } from "lodash";
import { describe, expect, it } from "vitest";
import { builtInPredicatePrimitives, foreignValues, nonPrimitiveValues } from "#test";

it("should check if value is a typed array", () => {
  expect(isTypedArray(new Int8Array())).toBe(true);

  expect(isTypedArray(new Uint8Array())).toBe(true);

  expect(isTypedArray(new Uint8ClampedArray())).toBe(true);

  expect(isTypedArray(new Int16Array())).toBe(true);

  expect(isTypedArray(new Uint16Array())).toBe(true);

  expect(isTypedArray(new Int32Array())).toBe(true);

  expect(isTypedArray(new Uint32Array())).toBe(true);

  expect(isTypedArray(new Float32Array())).toBe(true);

  expect(isTypedArray(new Float64Array())).toBe(true);

  expect(isTypedArray(new BigInt64Array())).toBe(true);

  expect(isTypedArray(new BigUint64Array())).toBe(true);

  expect(isTypedArray([])).toBe(false);
});

describe("lodash compatibility", () => {
  it("recognizes numeric and BigInt typed arrays, including foreign views", () => {
    const constructors = [
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
    ];

    for (const value of [
      ...constructors.map(Ctor => new Ctor(1)),
      Buffer.alloc(8),
      ...foreignValues(...constructors.map(Ctor => `new ${ Ctor.name }(1)`)),
    ]) {
      expect(isTypedArray(value)).toBe(true);
      expect(lodashIsTypedArray(value)).toBe(true);
    }
  });

  it("rejects nonmatching values", () => {
    for (const value of [
      ...builtInPredicatePrimitives,
      ...nonPrimitiveValues,
      new ArrayBuffer(8),
      new DataView(new ArrayBuffer(8)),
    ]) {
      expect(isTypedArray(value)).toBe(false);
      expect(lodashIsTypedArray(value)).toBe(false);
    }
  });
});

it("recognizes typed arrays independently of custom tags and length properties", () => {
  const source = 'Object.defineProperty(new Uint8Array(1), Symbol.toStringTag, { value: "Custom" })';
  const [taggedArray] = foreignValues(source);

  const standIn = {
    length              : 1,
    [Symbol.toStringTag]: "Uint8Array",
  };

  expect(isTypedArray(taggedArray)).toBe(true);
  expect(lodashIsTypedArray(taggedArray)).toBe(true);
  expect(isTypedArray(standIn)).toBe(false);
  expect(lodashIsTypedArray(standIn)).toBe(false);

  const value = new Uint8Array(1);
  Object.defineProperty(value, "length", { value: -1 });
  expect(isTypedArray(value)).toBe(true);
  expect(lodashIsTypedArray(value)).toBe(true);
});

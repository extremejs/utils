import { isTypedArray } from "@extremejs/utils";

it("should check if value is a typed array", () => {
  expect(isTypedArray(new Int8Array)).toBe(true);

  expect(isTypedArray(new Uint8Array)).toBe(true);

  expect(isTypedArray(new Uint8ClampedArray)).toBe(true);

  expect(isTypedArray(new Int16Array)).toBe(true);

  expect(isTypedArray(new Uint16Array)).toBe(true);

  expect(isTypedArray(new Int32Array)).toBe(true);

  expect(isTypedArray(new Uint32Array)).toBe(true);

  expect(isTypedArray(new Float32Array)).toBe(true);

  expect(isTypedArray(new Float64Array)).toBe(true);

  expect(isTypedArray(new BigInt64Array)).toBe(true);

  expect(isTypedArray(new BigUint64Array)).toBe(true);

  expect(isTypedArray([])).toBe(false);
});

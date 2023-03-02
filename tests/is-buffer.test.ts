import { isBuffer } from "@extremejs/utils";

it("should determine whether the provided value is a Buffer or not", () => {
  expect(isBuffer(Buffer.from([2]))).toBe(true);

  expect(isBuffer(Uint8Array.from([2]))).toBe(false);
});

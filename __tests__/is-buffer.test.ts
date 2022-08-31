import { isBuffer } from "@extremejs/utils";

it("should determine whether the provided value is a Buffer or not", () => {
  expect(isBuffer(new Buffer(2))).toBe(true);

  expect(isBuffer(new Uint8Array(2))).toBe(false);
});

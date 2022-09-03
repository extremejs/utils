import { isArrayBuffer } from "@extremejs/utils";

it("should check if value is an ArrayBuffer object", () => {
  expect(isArrayBuffer(new ArrayBuffer(2))).toBe(true);

  expect(isArrayBuffer(new Array(2))).toBe(false);
});

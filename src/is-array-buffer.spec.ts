import { isArrayBuffer } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should check if value is an ArrayBuffer object", () => {
  expect(isArrayBuffer(new ArrayBuffer(2))).toBe(true);

  // oxlint-disable-next-line unicorn/no-new-array -- Exercise the Array constructor without changing the test input.
  expect(isArrayBuffer(new Array(2))).toBe(false);
});

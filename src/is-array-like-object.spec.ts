import { isArrayLikeObject } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should check if value is an array-like object", () => {
  expect(isArrayLikeObject([1, 2, 3])).toBe(true);

  expect(isArrayLikeObject("abc")).toBe(false);

  expect(isArrayLikeObject(() => 0)).toBe(false);
});

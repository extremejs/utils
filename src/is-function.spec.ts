import { isFunction } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should determine whether the provided value is a function or not", () => {
  expect(isFunction(() => 0)).toBe(true);

  expect(isFunction(2)).toBe(false);
});

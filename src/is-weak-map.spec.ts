import { isWeakMap } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should determine whether the provided value is a WeakMap object or not", () => {
  expect(isWeakMap(new WeakMap())).toBe(true);

  expect(isWeakMap(new Map())).toBe(false);
});

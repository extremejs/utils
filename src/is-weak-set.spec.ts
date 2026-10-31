import { isWeakSet } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should determine whether the provided value is a WeakSet object or not", () => {
  expect(isWeakSet(new WeakSet())).toBe(true);

  expect(isWeakSet(new Set())).toBe(false);
});

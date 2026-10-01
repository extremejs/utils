import { isSet } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should determine whether the provided value is a Set object or not", () => {
  expect(isSet(new Set())).toBe(true);

  expect(isSet(new WeakSet())).toBe(false);
});

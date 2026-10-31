import { isMap } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should determine whether the provided value is a Map object or not", () => {
  expect(isMap(new Map())).toBe(true);

  expect(isMap(new WeakMap())).toBe(false);
});

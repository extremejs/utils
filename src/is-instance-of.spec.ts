import { isInstanceOf } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should determine whether the provided value is an instance of the provided constructor or not", () => {
  expect(isInstanceOf(new Map(), Map)).toBe(true);

  expect(isInstanceOf(new WeakMap(), Map)).toBe(false);

  expect(isInstanceOf(1, Number)).toBe(false);
});

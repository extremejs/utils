import { prototypeOf } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should return the Object.getPrototypeOf result of value", () => {
  expect(prototypeOf(Object.create(null))).toBeNull();
});

it("returns the immediate prototype and boxes non-nullish primitives", () => {
  const parent = { a: 1 };
  const value = Object.setPrototypeOf({}, parent);

  expect(prototypeOf(value)).toBe(parent);
  expect(prototypeOf(1)).toBe(Number.prototype);
});

it("throws for nullish values", () => {
  expect(() => prototypeOf(null)).toThrow(TypeError);
  expect(() => prototypeOf(void 0)).toThrow(TypeError);
});

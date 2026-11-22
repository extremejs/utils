import { isInstanceOf } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should determine whether the provided value is an instance of the provided constructor or not", () => {
  expect(isInstanceOf(new Map(), Map)).toBe(true);

  expect(isInstanceOf(new WeakMap(), Map)).toBe(false);

  expect(isInstanceOf(1, Number)).toBe(false);
});

it("honors the constructor's Symbol.hasInstance method", () => {
  class CustomInstance {

    public static [Symbol.hasInstance](value: unknown): boolean {
      return value === "accepted";
    }

  }

  expect(isInstanceOf("accepted", CustomInstance)).toBe(true);
  expect(isInstanceOf({}, CustomInstance)).toBe(false);
});

it("propagates the native error for a function with no instance prototype", () => {
  expect(() => isInstanceOf({}, (): number => 0)).toThrow(TypeError);
});

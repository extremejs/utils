import { isInstanceOf } from "@extremejs/utils";
import { expect, expectTypeOf, it } from "vitest";

it("should determine whether the provided value is an instance of the provided constructor or not", () => {
  expect(isInstanceOf(new Map(), Map)).toBe(true);

  expect(isInstanceOf(new WeakMap(), Map)).toBe(false);

  expect(isInstanceOf(1, Number)).toBe(false);
});

it("propagates the native error for a function with no instance prototype", () => {
  expect(() => isInstanceOf({}, (): number => 0)).toThrow(TypeError);
});

it("narrows an ordinary constructor and honors a custom instance type predicate", () => {
  const stringInstance = {
    [Symbol.hasInstance](value: unknown): value is string {
      return typeof value === "string";
    },
  };

  const check = (value: unknown): string | number | undefined => {
    if (isInstanceOf(value, Map)) return value.size;
    if (isInstanceOf(value, stringInstance)) return value.toUpperCase();
    return void 0;
  };

  expect(check("hello")).toBe("HELLO");
  expect(check(new Map([[1, 2]]))).toBe(1);
});

it("supports boolean-only hooks without narrowing to the constructor or callback result", () => {
  class CustomInstance {

    public static [Symbol.hasInstance](value: unknown): boolean {
      return value === "accepted";
    }

  }

  expect(isInstanceOf("accepted", CustomInstance)).toBe(true);
  expect(isInstanceOf({}, CustomInstance)).toBe(false);

  const check = (value: unknown): void => {
    if (isInstanceOf(value, CustomInstance)) expectTypeOf(value).toEqualTypeOf<unknown>();
    if (isInstanceOf(value, Array.prototype.slice)) expectTypeOf(value).toEqualTypeOf<unknown>();
  };

  check("accepted");
});

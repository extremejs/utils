import { isSymbol } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should determine whether the provided value is a symbol or not", () => {
  expect(isSymbol(Symbol())).toBe(true);

  expect(isSymbol(Symbol("foo"))).toBe(true);

  // oxlint-disable-next-line unicorn/new-for-builtins -- Exercise the original constructor call and boxed value.
  expect(isSymbol(Object(Symbol("foo")))).toBe(true);

  expect(isSymbol("bar")).toBe(false);

  expect(isSymbol(3)).toBe(false);
});

import { isSymbol } from "@extremejs/utils";

test("should determine whether the provided value is a symbol or not", () => {
  expect(isSymbol(Symbol())).toBe(true);

  expect(isSymbol(Symbol("foo"))).toBe(true);

  expect(isSymbol("bar")).toBe(false);

  expect(isSymbol(3)).toBe(false);
});

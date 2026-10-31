import { eq } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should perform a SameValueZero comparison between two values to determine if they are equivalent.", () => {
  const object = { a: 1 };
  const other = { a: 1 };

  expect(eq(object, object)).toBe(true);

  expect(eq(object, other)).toBe(false);

  expect(eq("a", "a")).toBe(true);

  // oxlint-disable-next-line unicorn/new-for-builtins -- Exercise the original constructor call and boxed value.
  expect(eq("a", Object("a"))).toBe(false);

  // oxlint-disable-next-line unicorn/prefer-number-properties -- Preserve the original test expression.
  expect(eq(NaN, NaN)).toBe(true);
});

import { eq } from "@extremejs/utils";
import { eq as lodashEq } from "lodash";
import { describe, expect, it } from "vitest";
import { boxedOne } from "#test";

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

describe("lodash compatibility", () => {
  it("compares signed zero, NaN, nullish values, and identity without coercion", () => {
    const object = { a: 1 };
    const pairs = [
      [void 0, void 0, true],
      [0, -0, true],
      [Number.NaN, Number.NaN, true],
      [1, 1, true],
      [null, void 0, false],
      [1, boxedOne, false],
      [1, "1", false],
      [object, object, true],
      [object, { a: 1 }, false],
    ] as const;

    for (const [value, other, expected] of pairs) {
      expect(eq(value, other)).toBe(expected);
      expect(lodashEq(value, other)).toBe(expected);
    }
  });
});

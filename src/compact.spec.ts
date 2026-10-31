import { compact } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should filter out the falsey values from the provided array", () => {
  expect(compact([
    0 as const,
    1,
    false as const,
    2,
    "" as const,
    3,
    "a",

    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    ("e" as never) * 23,
    Number.NaN,
    "s",
    34,
  ])).toEqual([1, 2, 3, "a", "s", 34]);
});

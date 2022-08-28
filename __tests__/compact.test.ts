import { compact } from "@extremejs/utils";

test("should filter out the falsey values from the provided array", () => {
  expect(compact([
    0 as const,
    1,
    false as const,
    2,
    "" as const,
    3,
    "a",
    ("e" as never) * 23,
    NaN,
    "s",
    34,
  ])).toEqual([1, 2, 3, "a", "s", 34]);
});

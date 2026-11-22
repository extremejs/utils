/* oxlint-disable eslint/no-undefined -- Distinguish explicit undefined, omitted defaults, and sparse holes. */

import { compact } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

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

describe("lodash compatibility", () => {
  it("removes falsy values and skips holes while keeping truthy values in order", () => {
    // oxlint-disable-next-line unicorn/no-new-array -- Create a sparse array with this length.
    const values = new Array<unknown>(1);
    values.push(undefined, null, false, 0, -0, 0n, "", Number.NaN, "0", "1", "2");
    const expected = ["0", "1", "2"];

    expect(compact(values)).toStrictEqual(expected);
    expect(lodash.compact(values)).toStrictEqual(expected);
  });
});

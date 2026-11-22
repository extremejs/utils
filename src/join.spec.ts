/* oxlint-disable eslint/no-undefined -- Distinguish explicit undefined, omitted defaults, and sparse holes. */

import { join } from "@extremejs/utils";
import lodash from "lodash";
import { describe, expect, it } from "vitest";

it("should convert all elements in the array into a string separated by the separator", () => {
  expect(join([1, 2, 3])).toBe("123");

  expect(join([1, 2, 3], ",")).toBe("1,2,3");
});

describe("lodash compatibility", () => {
  it("joins elements, including empty fields, with an explicit separator", () => {
    expect(join(["a", "b", "c"], "~")).toBe("a~b~c");
    expect(lodash.join(["a", "b", "c"], "~")).toBe("a~b~c");

    // oxlint-disable-next-line unicorn/no-new-array -- Create a sparse array with this length.
    const values = new Array<number | null | undefined>(1);
    values.push(null, undefined, 2);

    expect(join(values, "~")).toBe("~~~2");
    expect(lodash.join(values, "~")).toBe("~~~2");
  });

  it("defaults to no separator while Lodash defaults to a comma", () => {
    const values = ["a", "b", "c"];

    expect(join(values)).toBe("abc");
    expect(lodash.join(values)).toBe("a,b,c");
    expect(lodash.join(values, "")).toBe("abc");
  });
});

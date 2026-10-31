import { isArguments } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should check if value is likely an arguments object", () => {
  // oxlint-disable-next-line unicorn/consistent-function-scoping -- Keep test fixtures local to each test.
  function fn(): IArguments {
    // oxlint-disable-next-line prefer-rest-params
    return arguments;
  }

  expect(isArguments(fn())).toBe(true);

  expect(isArguments([1, 2, 3])).toBe(false);
});

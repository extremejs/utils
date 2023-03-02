import { isArguments } from "@extremejs/utils";

it("should check if value is likely an arguments object", () => {
  function fn(): IArguments {
    // eslint-disable-next-line prefer-rest-params
    return arguments;
  }

  expect(isArguments(fn())).toBe(true);

  expect(isArguments([1, 2, 3])).toBe(false);
});

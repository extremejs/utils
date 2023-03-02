import { isError } from "@extremejs/utils";

it("should determine whether the provided value is an Error or not", () => {
  expect(isError(new Error("error"))).toBe(true);

  expect(isError(new RangeError("error"))).toBe(true);

  expect(isError(2)).toBe(false);
});

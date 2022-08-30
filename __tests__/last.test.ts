import { last } from "@extremejs/utils";

it("should return the last element of the value", () => {
  // eslint-disable-next-line no-undefined,@typescript-eslint/no-confusing-void-expression
  expect(last([])).toBe(undefined);

  expect(last([0, 1, 2, 3, 4, 5])).toBe(5);

  // eslint-disable-next-line no-undefined
  expect(last("")).toBe(undefined);

  expect(last("012345")).toBe("5");
});

import { last } from "@extremejs/utils";

it("should return the last element of the value", () => {
  // oxlint-disable-next-line typescript/no-confusing-void-expression
  expect(last([])).toBeUndefined();

  expect(last([0, 1, 2, 3, 4, 5])).toBe(5);

  expect(last("")).toBeUndefined();

  expect(last("012345")).toBe("5");
});

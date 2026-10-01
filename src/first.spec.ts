import { first } from "@extremejs/utils";

it("should return the first element of the value", () => {
  expect(first([])).toBeUndefined();

  expect(first([0, 1, 2, 3, 4, 5])).toBe(0);

  expect(first("")).toBeUndefined();

  expect(first("012345")).toBe("0");
});

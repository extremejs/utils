import { first } from "@extremejs/utils";

it("should return the first element of the value", () => {
  // eslint-disable-next-line no-undefined
  expect(first([])).toBe(undefined);

  expect(first([0, 1, 2, 3, 4, 5])).toBe(0);

  // eslint-disable-next-line no-undefined
  expect(first("")).toBe(undefined);

  expect(first("012345")).toBe("0");
});

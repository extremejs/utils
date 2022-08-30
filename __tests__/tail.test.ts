import { tail } from "@extremejs/utils";

it("should return all but the first element of the value", () => {
  expect(tail([])).toEqual([]);

  expect(tail([0, 1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);

  expect(tail("")).toBe("");

  expect(tail("012345")).toBe("12345");
});

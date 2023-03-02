import { head } from "@extremejs/utils";

it("should return all but the last element of the value", () => {
  expect(head([])).toEqual([]);

  expect(head([0, 1, 2, 3, 4, 5])).toEqual([0, 1, 2, 3, 4]);

  expect(head("")).toBe("");

  expect(head("012345")).toBe("01234");
});

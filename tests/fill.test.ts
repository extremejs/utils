import { fill } from "@extremejs/utils";

it("should fill elements of array with value from start up to, but not including, end.", () => {
  expect(fill([1, 2, 3], 0)).toEqual([0, 0, 0]);

  expect(fill([1, 2, 3], 0, 1)).toEqual([1, 0, 0]);

  expect(fill([1, 2, 3], 0, 1, 2)).toEqual([1, 0, 3]);
});

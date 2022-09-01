import { concat } from "@extremejs/utils";

it("should create a new array concatenating the input array with any additional arrays and/or values.", () => {
  expect(concat<number[] | number>([1, 2], 3, [4], [[5]])).toEqual([1, 2, 3, 4, [5]]);
});

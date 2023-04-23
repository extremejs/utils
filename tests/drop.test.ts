import { drop } from "@extremejs/utils";

it("should drop the first element", () => {
  expect(drop([1, 2, 3])).toEqual([2, 3]);
  expect(drop([1, 2, 3], 1)).toEqual([2, 3]);

  expect(drop("123")).toEqual("23");
  expect(drop("123", 1)).toEqual("23");
});

it("should drop the first two elements", () => {
  expect(drop([1, 2, 3], 2)).toEqual([3]);

  expect(drop("123", 2)).toEqual("3");
});

it("should return an empty array/string when `n` >= `length`", () => {
  expect(drop([1, 2, 3], 3)).toEqual([]);
  expect(drop([1, 2, 3], 4)).toEqual([]);

  expect(drop("123", 3)).toEqual("");
  expect(drop("123", 4)).toEqual("");
});

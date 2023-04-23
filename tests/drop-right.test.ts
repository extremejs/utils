import { dropRight } from "@extremejs/utils";

it("should drop the last element", () => {
  expect(dropRight([1, 2, 3])).toEqual([1, 2]);
  expect(dropRight([1, 2, 3], 1)).toEqual([1, 2]);

  expect(dropRight("123")).toEqual("12");
  expect(dropRight("123", 1)).toEqual("12");
});

it("should drop the last two elements", () => {
  expect(dropRight([1, 2, 3], 2)).toEqual([1]);

  expect(dropRight("123", 2)).toEqual("1");
});

it("should return an empty array/string when `n` >= `length`", () => {
  expect(dropRight([1, 2, 3], 3)).toEqual([]);
  expect(dropRight([1, 2, 3], 4)).toEqual([]);

  expect(dropRight("123", 3)).toEqual("");
  expect(dropRight("123", 4)).toEqual("");
});

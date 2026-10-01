import { slice } from "@extremejs/utils";

it("should create a slice of the value from start, up to, but not including, end", () => {
  expect(slice([0, 1, 2, 3, 4, 5])).toEqual([0, 1, 2, 3, 4, 5]);

  expect(slice([0, 1, 2, 3, 4, 5], 2)).toEqual([2, 3, 4, 5]);

  expect(slice([0, 1, 2, 3, 4, 5], 2, 5)).toEqual([2, 3, 4]);

  expect(slice("012345")).toBe("012345");

  expect(slice("012345", 2)).toBe("2345");

  expect(slice("012345", 2, 4)).toBe("23");
});

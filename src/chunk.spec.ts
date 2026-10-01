import { chunk } from "@extremejs/utils";

it("should return chunked array", () => {
  expect(chunk([1, 2, 3])).toEqual([[1], [2], [3]]);

  expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
});

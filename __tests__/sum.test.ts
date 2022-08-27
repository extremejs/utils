import { sum } from "@extremejs/utils";

test("should return the sum of the elements", () => {
  expect(sum([1, 2, 3])).toBe(6);
});

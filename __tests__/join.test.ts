import { join } from "@extremejs/utils";

test("should convert all elements in the array into a string separated by the separator", () => {
  expect(join([1, 2, 3])).toBe("123");

  expect(join([1, 2, 3], ",")).toBe("1,2,3");
});

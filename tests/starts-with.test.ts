import { startsWith } from "@extremejs/utils";

it("should check whether the string starts with the given searchString", () => {
  expect(startsWith("012345", "012")).toBe(true);

  expect(startsWith("012345", "12")).toBe(false);

  expect(startsWith("012345", "234", 2)).toBe(true);
});

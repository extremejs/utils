import { repeat } from "@extremejs/utils";

it("should repeat the given string, by count times", () => {
  expect(repeat("*", 3)).toBe("***");

  expect(repeat("abc", 2)).toBe("abcabc");

  expect(repeat("abc", 0)).toBe("");
});

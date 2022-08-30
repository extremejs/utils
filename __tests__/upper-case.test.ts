import { upperCase } from "@extremejs/utils";

test("should convert the given string to uppercase", () => {
  expect(upperCase("--foo-bar--")).toBe("--FOO-BAR--");

  expect(upperCase("fooBar")).toBe("FOOBAR");

  expect(upperCase("__foo_bar__")).toBe("__FOO_BAR__");
});

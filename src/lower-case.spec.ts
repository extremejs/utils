import { lowerCase } from "@extremejs/utils";

it("should convert the given string to lowercase", () => {
  expect(lowerCase("--Foo-Bar--")).toBe("--foo-bar--");

  expect(lowerCase("fooBar")).toBe("foobar");

  expect(lowerCase("__FOO_BAR__")).toBe("__foo_bar__");
});

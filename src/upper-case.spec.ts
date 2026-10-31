import { upperCase } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should convert the given string to uppercase", () => {
  expect(upperCase("--foo-bar--")).toBe("--FOO-BAR--");

  expect(upperCase("fooBar")).toBe("FOOBAR");

  expect(upperCase("__foo_bar__")).toBe("__FOO_BAR__");
});

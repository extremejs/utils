import { objectToStringTag } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should convert value to a string tag", () => {
  expect(objectToStringTag({})).toBe("Object");

  expect(objectToStringTag(2)).toBe("Number");
});

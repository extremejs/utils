import pkg from "@extremejs/utils/package.json" with { type: "json" };
import { expect, it } from "vitest";

it("should export package.json", () => {
  expect(pkg.name).toBe("@extremejs/utils");
});

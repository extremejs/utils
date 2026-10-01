import { noop } from "@extremejs/utils";
import { expect, it } from "vitest";

it("should return undefined", () => {
  // oxlint-disable-next-line typescript/no-confusing-void-expression
  expect(noop()).toBeUndefined();
});

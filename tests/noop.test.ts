import { noop } from "@extremejs/utils";

it("should return undefined", () => {
  // oxlint-disable-next-line typescript/no-confusing-void-expression
  expect(noop()).toBeUndefined();
});

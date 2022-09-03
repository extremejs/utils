import { noop } from "@extremejs/utils";

it("should return undefined", () => {
  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  expect(noop()).toBeUndefined();
});

import { prototypeOf } from "@extremejs/utils";

it("should return the Object.getPrototypeOf result of value", () => {
  expect(prototypeOf(Object.create(null))).toBeNull();
});

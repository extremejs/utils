import { eq } from "@extremejs/utils";

it("should perform a SameValueZero comparison between two values to determine if they are equivalent.", () => {
  const object = { a: 1 };
  const other = { a: 1 };

  expect(eq(object, object)).toBe(true);

  expect(eq(object, other)).toBe(false);

  expect(eq("a", "a")).toBe(true);

  expect(eq("a", Object("a"))).toBe(false);

  expect(eq(NaN, NaN)).toBe(true);
});

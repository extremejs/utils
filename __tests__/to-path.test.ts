import { toPath } from "@extremejs/utils";

it("should return the path of a value in an object representing the property", () => {
  expect(toPath("a.b[0].c[d]")).toEqual(["a", "b", "0", "c", "d"]);

  expect(toPath("a.b.0.c.d")).toEqual(["a", "b", "0", "c", "d"]);

  expect(toPath(0)).toEqual([0]);

  const symbol = Symbol();

  expect(toPath(symbol)).toEqual([symbol]);
});

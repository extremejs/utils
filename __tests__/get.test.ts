import { get } from "@extremejs/utils";

test("should return value of the provided property in an object", () => {
  expect(get({ a: { b: [{ c: { d: 1 } }] } }, "a.b.0.c.d")).toBe(1);

  expect(get({ a: { b: [{ c: { d: 2 } }] } }, "a.b[0][c].d")).toBe(2);

  // eslint-disable-next-line no-undefined
  expect(get({ a: { b: [{ c: { d: 3 } }] } }, "a.b.0.c.e" as never)).toBe(undefined);

  expect(get({ a: { b: [{ c: { d: 4 } }] } }, "a.b.0.e.d" as never, null)).toBe(null);

  expect(get({ a: { b: [{ c: { d: 5 } }] } }, "a.b.5.c.d", 6)).toBe(6);
});

test("should return value of the provided property in an array", () => {
  expect(get([{ a: { b: 1 } }], "0.a.b")).toBe(1);

  expect(get([{ a: { b: 2 } }], "0[a].b")).toBe(2);

  // eslint-disable-next-line no-undefined
  expect(get([{ a: { b: 3 } }], "a.b" as never)).toBe(undefined);

  expect(get([{ a: { b: 4 } }], "1.a.b" as never, null)).toBe(null);

  expect(get([{ a: { b: 5 } }], "1.a.b", 6)).toBe(6);
});

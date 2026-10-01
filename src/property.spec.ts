import { property } from "@extremejs/utils";

it("should return value of the provided direct property", () => {
  const fn = property("foo");
  const obj = { foo: "bar" };

  expect(fn(obj)).toEqual(obj.foo);
});

it("should return value of the provided nested property", () => {
  const fn = property("foo.bar");
  const obj = { foo: { bar: "baz" } };

  expect(fn(obj)).toEqual(obj.foo.bar);
});

it("should return the fallback value", () => {
  const fallback = "baz";
  const fn = property("foo.bar", fallback);
  const obj = { foo: "bar" };

  expect(fn(obj)).toEqual(fallback);
});

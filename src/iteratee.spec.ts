import { iteratee } from "@extremejs/utils";

describe("with property as iteratee", () => {
  it("should return value of the provided direct property", () => {
    const fn = iteratee("foo");
    const obj = { foo: "bar" };

    expect(fn(obj)).toEqual(obj.foo);
  });

  it("should return value of the provided nested property", () => {
    const fn = iteratee("foo.bar");
    const obj = { foo: { bar: "baz" } };

    expect(fn(obj)).toEqual(obj.foo.bar);
  });

  it("should return the fallback value", () => {
    const fallback = "baz";
    const fn = iteratee("foo.bar", fallback);
    const obj = { foo: "bar" };

    expect(fn(obj)).toEqual(fallback);
  });
});

describe("with function as iteratee", () => {
  it("should return value of the provided direct property", () => {
    const fn = iteratee((value: { foo: string; }) => value.foo);
    const obj = { foo: "bar" };

    expect(fn(obj)).toEqual(obj.foo);
  });

  it("should return value of the provided nested property", () => {
    const fn = iteratee((value: { foo: { bar: string; }; }) => value.foo.bar);
    const obj = { foo: { bar: "baz" } };

    expect(fn(obj)).toEqual(obj.foo.bar);
  });

  it("should ignore the fallback value", () => {
    // Exercise an ignored fallback with the original input.
    // oxlint-disable-next-line typescript/no-explicit-any typescript/no-unsafe-type-assertion
    const fn = iteratee((value: { foo: any; }) => value.foo.bar, "baz" as never);
    const obj = { foo: "bar" };

    expect(fn(obj)).toBeUndefined();
  });
});

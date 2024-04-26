import { keys } from "@extremejs/utils";
import { PRIMITIVES, toArguments, toStrictArguments } from "./utils/index.js";

it("should return the string keyed property names of object", () => {
  expect(keys({
    a: 0,
    b: 1,
    c: 2,
  })).toEqual(["a", "b", "c"]);
});

it("should not include inherited string keyed properties", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function fn(this: any): void {
    this.bar = "baz";
  }

  fn.prototype.foo = "bar";

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line new-cap
  expect(keys(new fn)).toEqual(["bar"]);
});

it("should treat sparse arrays as dense", () => {
  const array = [1];

  array[2] = 3;

  expect(keys(array)).toEqual(["0", "1", "2"]);
});

it("should return keys for custom properties on arrays", () => {
  const array = [1];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (array as any).a = 1;

  expect(keys(array)).toEqual(["0", "a"]);
});

it("should not include inherited string keyed properties of arrays", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Array.prototype as any).a = 1;

  expect(keys([1])).toEqual(["0"]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (Array.prototype as any).a;
});

it("should work with arguments objects", () => {
  const values = [toArguments(1, 2, 3), toStrictArguments(1, 2, 3)];

  expect(values.map(keys)).toEqual([
    ["0", "1", "2"],
    ["0", "1", "2"],
  ]);
});

it("should return keys for custom properties on arguments objects", () => {
  const values = [toArguments(1, 2, 3), toStrictArguments(1, 2, 3)];

  expect(values.map((value) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value as any).a = 1;

    const result = keys(value);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (value as any).a;

    return result;
  })).toEqual([
    ["0", "1", "2", "a"],
    ["0", "1", "2", "a"],
  ]);
});

it("should not include inherited string keyed properties of arguments objects", () => {
  const values = [toArguments(1, 2, 3), toStrictArguments(1, 2, 3)];

  expect(values.map((value) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Object.prototype as any).a = 1;

    const result = keys(value);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (Object.prototype as any).a;

    return result;
  })).toEqual([
    ["0", "1", "2"],
    ["0", "1", "2"],
  ]);
});

it("should work with string objects", () => {
  expect(keys(Object("abc"))).toEqual(["0", "1", "2"]);
});

it("should return keys for custom properties on string objects", () => {
  const object = Object("a");

  object.a = 1;

  expect(keys(object)).toEqual(["0", "a"]);
});

it("should not include inherited string keyed properties of string objects", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (String.prototype as any).a = 1;

  expect(keys(Object("a"))).toEqual(["0"]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (String.prototype as any).a;
});

it("should work with array-like objects", () => {
  expect(keys({
    0     : "a",
    length: 1,
  })).toEqual(["0", "length"]);
});

it("should coerce primitives to objects (test in IE 9)", () => {
  expect(PRIMITIVES.map(keys))
    .toEqual(PRIMITIVES.map(value => (typeof value === "string" ? ["0"] : [])));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Number.prototype as any).a = 1;

  expect(keys(0)).toEqual([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (Number.prototype as any).a;
});

it("should skip the constructor property on prototype objects", () => {
  function Fn(): void {
    /* empty */
  }

  Fn.prototype.a = 1;

  expect(keys(Fn.prototype)).toEqual(["a"]);

  Fn.prototype = {
    constructor: Fn,
    a          : 1,
  };

  expect(keys(Fn.prototype)).toEqual(["a"]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Fake = { prototype: {} as any };

  Fake.prototype.constructor = Fake;

  expect(keys(Fake.prototype)).toEqual(["constructor"]);
});

it("should return an empty array when object is nullish", () => {
  // eslint-disable-next-line no-undefined
  const values = [null, undefined];

  expect(values.map((value, index) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Object.prototype as any).a = 1;

    // eslint-disable-next-line no-undefined
    const result = index ? keys(value) : keys(undefined);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (Object.prototype as any).a;

    return result;
  })).toEqual([[], []]);
});

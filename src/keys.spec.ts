// oxlint-disable unicorn/consistent-function-scoping
import { keys } from "@extremejs/utils";
import { keys as lodashKeys } from "lodash";
import { describe, expect, it } from "vitest";
import { PRIMITIVES, toArguments, toStrictArguments } from "#test";

it("should return the string keyed property names of object", () => {
  expect(keys({
    a: 0,
    b: 1,
    c: 2,
  })).toEqual(["a", "b", "c"]);
});

it("should not include inherited string keyed properties", () => {
  // oxlint-disable-next-line typescript/no-explicit-any
  function fn(this: any): void {
    this.bar = "baz";
  }

  fn.prototype.foo = "bar";

  // oxlint-disable-next-line typescript/ban-ts-comment
  // @ts-expect-error
  // oxlint-disable-next-line new-cap
  expect(keys(new fn())).toEqual(["bar"]);
});

it("should treat sparse arrays as dense", () => {
  const array = [1];

  array[2] = 3;

  expect(keys(array)).toEqual(["0", "1", "2"]);
});

it("should return keys for custom properties on arrays", () => {
  const array = Object.assign([1], { "a.b[0]": 1 });

  expect(keys(array)).toEqual(["0", "a.b[0]"]);
});

it("should not include inherited string keyed properties of arrays", () => {
  // oxlint-disable-next-line typescript/no-explicit-any typescript/no-unsafe-type-assertion
  (Array.prototype as any).a = 1;

  expect(keys([1])).toEqual(["0"]);

  // oxlint-disable-next-line typescript/no-explicit-any typescript/no-unsafe-type-assertion
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
    // oxlint-disable-next-line typescript/no-explicit-any typescript/no-unsafe-type-assertion
    (value as any).a = 1;

    const result = keys(value);

    // oxlint-disable-next-line typescript/no-explicit-any typescript/no-unsafe-type-assertion
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
    // oxlint-disable-next-line typescript/no-explicit-any typescript/no-unsafe-type-assertion
    (Object.prototype as any).a = 1;

    const result = keys(value);

    // oxlint-disable-next-line typescript/no-explicit-any typescript/no-unsafe-type-assertion
    delete (Object.prototype as any).a;

    return result;
  })).toEqual([
    ["0", "1", "2"],
    ["0", "1", "2"],
  ]);
});

it("should work with string objects", () => {
  // oxlint-disable-next-line unicorn/new-for-builtins
  expect(keys(Object("abc"))).toEqual(["0", "1", "2"]);
});

it("should return keys for custom properties on string objects", () => {
  // oxlint-disable-next-line unicorn/new-for-builtins
  const object = Object("a");

  object.a = 1;

  expect(keys(object)).toEqual(["0", "a"]);
});

it("should not include inherited string keyed properties of string objects", () => {
  // oxlint-disable-next-line typescript/no-explicit-any typescript/no-unsafe-type-assertion
  (String.prototype as any).a = 1;

  // oxlint-disable-next-line unicorn/new-for-builtins -- Exercise the original constructor call and boxed value.
  expect(keys(Object("a"))).toEqual(["0"]);

  // oxlint-disable-next-line typescript/no-explicit-any typescript/no-unsafe-type-assertion
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

  // oxlint-disable-next-line typescript/no-explicit-any typescript/no-unsafe-type-assertion
  (Number.prototype as any).a = 1;

  expect(keys(0)).toEqual([]);

  // oxlint-disable-next-line typescript/no-explicit-any typescript/no-unsafe-type-assertion
  delete (Number.prototype as any).a;
});

it("should skip the constructor property on prototype objects", () => {
  function Fn(): void {
    /* empty */
  }

  // oxlint-disable-next-line typescript/ban-ts-comment
  // @ts-expect-error
  Fn.prototype.a = 1;

  // oxlint-disable-next-line typescript/ban-ts-comment
  // @ts-expect-error
  expect(keys(Fn.prototype)).toEqual(["a"]);

  Fn.prototype = {
    constructor: Fn,
    a          : 1,
  };

  expect(keys(Fn.prototype)).toEqual(["a"]);

  // oxlint-disable-next-line typescript/no-explicit-any typescript/no-unsafe-type-assertion
  const Fake = { prototype: {} as any };

  Fake.prototype.constructor = Fake;

  expect(keys(Fake.prototype)).toEqual(["constructor"]);
});

it("should return an empty array when object is nullish", () => {
  const values = [null, void 0];

  expect(values.map((value, index) => {
    // oxlint-disable-next-line typescript/no-explicit-any typescript/no-unsafe-type-assertion
    (Object.prototype as any).a = 1;

    const result = index ? keys(value) : keys(void 0);

    // oxlint-disable-next-line typescript/no-explicit-any typescript/no-unsafe-type-assertion
    delete (Object.prototype as any).a;

    return result;
  })).toEqual([[], []]);
});

describe("lodash compatibility", () => {
  it("lists own enumerable string keys and skips a prototype constructor", () => {
    const token = Symbol("token");
    class Entry {

      public own = 1;

      public [token] = 2;

    }

    Object.defineProperty(Entry.prototype, "constructor", { enumerable: true });
    Object.assign(Entry.prototype, { inherited: 3 });
    const value = Object.defineProperty(new Entry(), "hidden", { value: 4 });

    expect(keys(value)).toStrictEqual(["own"]);
    expect(lodashKeys(value)).toStrictEqual(["own"]);
    expect(keys(Entry.prototype)).toStrictEqual(["inherited"]);
    expect(lodashKeys(Entry.prototype)).toStrictEqual(["inherited"]);

    const fake = { constructor: { prototype: {} } };
    fake.constructor.prototype = fake;

    expect(keys(fake)).toStrictEqual(["constructor"]);
    expect(lodashKeys(fake)).toStrictEqual(["constructor"]);
  });

  it("lists sparse array indices and keeps own custom keys on indexed values", () => {
    const sparse = [1];
    sparse[2] = 3;

    const arrayLike = {
      0     : "a",
      length: 2,
    };
    const inputs = [
      [Object.assign(sparse, { extra: true }), ["0", "1", "2", "extra"]],
      [Object.assign(toArguments(1, 2, 3), { extra: true }), ["0", "1", "2", "extra"]],
      [Object.assign(toStrictArguments(1, 2, 3), { extra: true }), ["0", "1", "2", "extra"]],

      // oxlint-disable-next-line unicorn/new-for-builtins -- Box the string.
      [Object.assign(Object("a"), { extra: true }), ["0", "extra"]],
      [Object.assign(Buffer.from([1]), { extra: true }), ["0", "extra"]],
      [Object.assign(new Uint8Array([1]), { extra: true }), ["0", "extra"]],
      [arrayLike, ["0", "length"]],
    ] as const;

    for (const [value, expected] of inputs) {
      expect(keys(value)).toStrictEqual(expected);
      expect(lodashKeys(value)).toStrictEqual(expected);
    }
  });

  it("keeps enumerable metadata that Lodash filters from indexed built-ins", () => {
    const buffer = Object.defineProperty(Buffer.from([1]), "offset", {
      enumerable: true,
      value     : 0,
    });
    const typed = Object.defineProperty(new Uint8Array([1]), "byteOffset", {
      enumerable: true,
      value     : 0,
    });

    expect(keys(buffer)).toStrictEqual(["0", "offset"]);
    expect(lodashKeys(buffer)).toStrictEqual(["0"]);
    expect(keys(typed)).toStrictEqual(["0", "byteOffset"]);
    expect(lodashKeys(typed)).toStrictEqual(["0"]);
  });

  it("excludes inherited keys on arrays, arguments, and boxed primitives", () => {
    const prototype = { inherited: true };
    const indexed = [
      [1],
      toArguments(1),
      toStrictArguments(1),

      // oxlint-disable-next-line unicorn/new-for-builtins -- Box the string.
      Object("a"),
    ];

    for (const value of indexed) {
      Object.setPrototypeOf(value, prototype);
      expect(keys(value)).toStrictEqual(["0"]);
      expect(lodashKeys(value)).toStrictEqual(["0"]);
    }

    // oxlint-disable-next-line unicorn/new-for-builtins -- Box the number.
    const number = Object.setPrototypeOf(Object(0), prototype);

    expect(keys(number)).toStrictEqual([]);
    expect(lodashKeys(number)).toStrictEqual([]);
  });

  it("boxes primitives and returns empty lists for nullish values", () => {
    const inputs = [...PRIMITIVES, null, void 0];

    expect(inputs.map(keys)).toStrictEqual(inputs.map(lodashKeys));
    expect(keys("abc")).toStrictEqual(lodashKeys("abc"));
    expect(keys(null)).toStrictEqual([]);
    expect(keys(void 0)).toStrictEqual([]);
  });
});

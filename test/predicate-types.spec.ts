// oxlint-disable unicorn/consistent-function-scoping -- Keep predicates beside their type assertions.
import {
  isArguments,
  isArrayLike,
  isArrayLikeObject,
  isBoolean,
  isFunction,
  isNumber,
  isObject,
  isString,
  isSymbol,
  isTypedArray,
  isWeakMap,
  isWeakSet,
  objectToString,
  objectToStringTag,
} from "@extremejs/utils";
import { expect, expectTypeOf, test } from "vitest";
import { toArguments } from "#test";

test("boxed guards preserve the primitive and object cases", () => {
  const check = (value: unknown): unknown => {
    // oxlint-disable-next-line typescript/no-wrapper-object-types -- Check the genuine boxed case.
    if (isBoolean(value)) expectTypeOf(value).toEqualTypeOf<boolean | Boolean>();

    // oxlint-disable-next-line typescript/no-wrapper-object-types -- Check the genuine boxed case.
    if (isNumber(value)) expectTypeOf(value).toEqualTypeOf<number | Number>();

    // oxlint-disable-next-line typescript/no-wrapper-object-types -- Check the genuine boxed case.
    if (isString(value)) expectTypeOf(value).toEqualTypeOf<string | String>();

    // oxlint-disable-next-line typescript/no-wrapper-object-types -- Check the genuine boxed case.
    if (isSymbol(value)) expectTypeOf(value).toEqualTypeOf<symbol | Symbol>();
    return value;
  };

  expect(check(false)).toBe(false);
});

test("array-like guards narrow unknown inputs without eliminating invalid length objects", () => {
  const readLength = (value: unknown): number | undefined => {
    if (isArrayLikeObject(value)) {
      expectTypeOf(value).toExtend<object>();
      expectTypeOf(value.length).toExtend<number>();
      return value.length;
    }

    if (isArrayLike(value)) return value.length;
    return void 0;
  };

  expect(readLength({ length: 2 })).toBe(2);
  expect(readLength("abc")).toBe(3);
  expect(readLength({ length: -1 })).toBeUndefined();

  const invalid = { length: -1 };
  if (!isArrayLike(invalid) && !isArrayLikeObject(invalid)) expect(invalid.length).toBe(-1);
});

test("recognizing a class from unknown does not allow a direct call", () => {
  const check = (value: unknown): void => {
    if (isFunction(value)) {
      // @ts-expect-error A class passes this guard and cannot be called.
      expect(() => value()).toThrow(TypeError);
    }
  };

  check(class Example {});

  const callback = (): string => "ok";
  if (isFunction(callback)) expect(callback()).toBe("ok");

  const readPrototype = (value: { prototype: string; } | number): string => {
    if (!isFunction(value) && typeof value === "object") return value.prototype;
    return "";
  };
  expect(readPrototype({ prototype: "record" })).toBe("record");
});

test("weak collections can be used with non-registered symbols", () => {
  const key = Symbol("key");
  const addToWeakMap = (value: unknown): unknown => {
    if (isWeakMap(value)) return value.set(key, 1).get(key);
    return void 0;
  };
  const addToWeakSet = (value: unknown): boolean => isWeakSet(value) && value.add(key).has(key);

  expect(addToWeakMap(new WeakMap())).toBe(1);
  expect(addToWeakSet(new WeakSet())).toBe(true);
});

test("structural guards and introspection expose the operations supported by the results", () => {
  const check = (value: unknown): void => {
    if (isObject(value)) expectTypeOf(value).toEqualTypeOf<object>();
    if (isArguments(value)) expectTypeOf(value).toEqualTypeOf<IArguments>();
    if (isTypedArray(value)) expectTypeOf(value.length).toEqualTypeOf<number>();
  };

  check(toArguments(1));
  check(new Float16Array(1));
  const tagged = { [Symbol.toStringTag]: "Widget" };

  expectTypeOf(objectToString(tagged)).toEqualTypeOf<`[object ${ string }]`>();
  expectTypeOf(objectToStringTag(tagged)).toEqualTypeOf<string>();
});

import {
  isArrayBuffer,
  isBoolean,
  isDate,
  isError,
  isMap,
  isNumber,
  isRegExp,
  isSet,
  isString,
  isSymbol,
  isTypedArray,
  isWeakMap,
  isWeakSet,
} from "@extremejs/utils";
import { expect, test } from "vitest";

test.each([
  ["ArrayBuffer", isArrayBuffer, ArrayBuffer.prototype],
  ["Boolean", isBoolean, Boolean.prototype],
  ["Date", isDate, Date.prototype],
  ["Error", isError, Error.prototype],
  ["DOMException", isError, DOMException.prototype],
  ["Map", isMap, Map.prototype],
  ["Number", isNumber, Number.prototype],
  ["RegExp", isRegExp, RegExp.prototype],
  ["Set", isSet, Set.prototype],
  ["String", isString, String.prototype],
  ["Symbol", isSymbol, Symbol.prototype],
  ["Uint8Array", isTypedArray, Uint8Array.prototype],
  ["WeakMap", isWeakMap, WeakMap.prototype],
  ["WeakSet", isWeakSet, WeakSet.prototype],
])("rejects prototype-only and custom-tag %s lookalikes", (tag, predicate, prototype) => {
  const prototypeOnly: unknown = Object.create(prototype);
  const taggedRecord = { [Symbol.toStringTag]: tag };

  expect(predicate(prototypeOnly)).toBe(false);
  expect(predicate(taggedRecord)).toBe(false);
});

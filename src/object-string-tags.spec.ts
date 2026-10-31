import { OBJECT_STRING_TAG, isTypedArray, objectToString, objectToStringTag } from "@extremejs/utils";
import { expect, test } from "vitest";
import * as moduleNamespace from "./object-to-string.js";

function *generator(): Generator<void> {
  /* empty */
}

async function *asyncGenerator(): AsyncGenerator<void> {
  /* empty */
}

const segmenter = new Intl.Segmenter("en");

const cases: Array<[OBJECT_STRING_TAG, unknown]> = [
  [OBJECT_STRING_TAG.ASYNC_GENERATOR_FUNCTION, asyncGenerator],
  [OBJECT_STRING_TAG.GENERATOR, generator()],
  [OBJECT_STRING_TAG.ASYNC_GENERATOR, asyncGenerator()],
  [OBJECT_STRING_TAG.ITERATOR, Iterator.from({ next: () => ({ value: 0 }) })],
  [OBJECT_STRING_TAG.ITERATOR_HELPER, [1].values().take(1)],
  [OBJECT_STRING_TAG.ARRAY_ITERATOR, [].values()],
  [OBJECT_STRING_TAG.STRING_ITERATOR, "foo"[Symbol.iterator]()],
  [OBJECT_STRING_TAG.MAP_ITERATOR, new Map().entries()],
  [OBJECT_STRING_TAG.SET_ITERATOR, new Set().values()],
  [OBJECT_STRING_TAG.REGEXP_STRING_ITERATOR, "foo".matchAll(/o/g)],
  [OBJECT_STRING_TAG.SHARED_ARRAY_BUFFER, new SharedArrayBuffer(0)],
  [OBJECT_STRING_TAG.DATA_VIEW, new DataView(new ArrayBuffer(0))],
  [OBJECT_STRING_TAG.WEAK_REF, new WeakRef({})],
  [OBJECT_STRING_TAG.FINALIZATION_REGISTRY, new FinalizationRegistry(() => { /* empty */ })],
  [OBJECT_STRING_TAG.DISPOSABLE_STACK, new DisposableStack()],
  [OBJECT_STRING_TAG.ASYNC_DISPOSABLE_STACK, new AsyncDisposableStack()],
  [OBJECT_STRING_TAG.FLOAT_16_ARRAY, new Float16Array()],
  [OBJECT_STRING_TAG.MATH, Math],
  [OBJECT_STRING_TAG.JSON, JSON],
  [OBJECT_STRING_TAG.REFLECT, Reflect],
  [OBJECT_STRING_TAG.ATOMICS, Atomics],
  [OBJECT_STRING_TAG.MODULE, moduleNamespace],
  [OBJECT_STRING_TAG.INTL, Intl],
  [OBJECT_STRING_TAG.INTL_COLLATOR, new Intl.Collator("en")],
  [OBJECT_STRING_TAG.INTL_DATE_TIME_FORMAT, new Intl.DateTimeFormat("en")],
  [OBJECT_STRING_TAG.INTL_DISPLAY_NAMES, new Intl.DisplayNames("en", { type: "language" })],
  [OBJECT_STRING_TAG.INTL_DURATION_FORMAT, new Intl.DurationFormat("en")],
  [OBJECT_STRING_TAG.INTL_LIST_FORMAT, new Intl.ListFormat("en")],
  [OBJECT_STRING_TAG.INTL_LOCALE, new Intl.Locale("en")],
  [OBJECT_STRING_TAG.INTL_NUMBER_FORMAT, new Intl.NumberFormat("en")],
  [OBJECT_STRING_TAG.INTL_PLURAL_RULES, new Intl.PluralRules("en")],
  [OBJECT_STRING_TAG.INTL_RELATIVE_TIME_FORMAT, new Intl.RelativeTimeFormat("en")],
  [OBJECT_STRING_TAG.INTL_SEGMENTER, segmenter],
  [OBJECT_STRING_TAG.SEGMENTER_STRING_ITERATOR, segmenter.segment("foo")[Symbol.iterator]()],
];

test.each(cases)("should recognize the standard %s tag", (tag, value) => {
  expect(tag).toBe(Object.prototype.toString.call(value).slice(8, -1));
  expect(objectToString(value)).toBe(`[object ${ tag }]`);
  expect(objectToStringTag(value)).toBe(tag);
});

test("should recognize Float16Array as a typed array", () => {
  const value = new Float16Array([1, 2]);
  const result: true = isTypedArray(value);

  expect(result).toBe(true);
  expect(isTypedArray(new DataView(new ArrayBuffer(0)))).toBe(false);
});

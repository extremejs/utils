import { noop, OBJECT_STRING_TAG, objectToString, objectToStringTag } from "@extremejs/utils";

it("should convert value to a string using Object.prototype.toString", () => {
  expect(objectToString({})).toBe("[object Object]");

  expect(objectToString(2)).toBe("[object Number]");
});

test("OBJECT_STRING_TAG should have all the js tags", () => {
  function fn(): IArguments {
    // eslint-disable-next-line prefer-rest-params
    return arguments;
  }

  function *genFn(): Generator<void> {
    /* empty */
  }

  expect(OBJECT_STRING_TAG.ARRAY).toBe(objectToStringTag([]));

  expect(OBJECT_STRING_TAG.ARRAY_BUFFER).toBe(objectToStringTag(new ArrayBuffer(2)));

  expect(OBJECT_STRING_TAG.NUMBER).toBe(objectToStringTag(2));

  expect(OBJECT_STRING_TAG.STRING).toBe(objectToStringTag("foo"));

  expect(OBJECT_STRING_TAG.BOOLEAN).toBe(objectToStringTag(true));

  expect(OBJECT_STRING_TAG.OBJECT).toBe(objectToStringTag({}));

  expect(OBJECT_STRING_TAG.DATE).toBe(objectToStringTag(new Date));

  expect(OBJECT_STRING_TAG.BIG_INT).toBe(objectToStringTag(2n));

  expect(OBJECT_STRING_TAG.NULL).toBe(objectToStringTag(null));

  // eslint-disable-next-line no-undefined
  expect(OBJECT_STRING_TAG.UNDEFINED).toBe(objectToStringTag(undefined));

  expect(OBJECT_STRING_TAG.SYMBOL).toBe(objectToStringTag(Symbol()));

  expect(OBJECT_STRING_TAG.REGEXP).toBe(objectToStringTag(/abc/));

  expect(OBJECT_STRING_TAG.ARGUMENTS).toBe(objectToStringTag(fn()));

  expect(OBJECT_STRING_TAG.FUNCTION).toBe(objectToStringTag(noop));

  expect(OBJECT_STRING_TAG.ASYNC_FUNCTION).toBe(objectToStringTag(async () => 0));

  expect(OBJECT_STRING_TAG.GENERATOR_FUNCTION).toBe(objectToStringTag(genFn));

  expect(OBJECT_STRING_TAG.PROMISE).toBe(objectToStringTag(new Promise(noop)));

  expect(OBJECT_STRING_TAG.MAP).toBe(objectToStringTag(new Map));

  expect(OBJECT_STRING_TAG.WEAK_MAP).toBe(objectToStringTag(new WeakMap));

  expect(OBJECT_STRING_TAG.SET).toBe(objectToStringTag(new Set));

  expect(OBJECT_STRING_TAG.WEAK_SET).toBe(objectToStringTag(new WeakSet));

  expect(OBJECT_STRING_TAG.ERROR).toBe(objectToStringTag(new Error));

  expect(OBJECT_STRING_TAG.INT_8_ARRAY).toBe(objectToStringTag(new Int8Array));

  expect(OBJECT_STRING_TAG.UINT_8_ARRAY).toBe(objectToStringTag(new Uint8Array));

  expect(OBJECT_STRING_TAG.UINT_8_CLAMPED_ARRAY).toBe(objectToStringTag(new Uint8ClampedArray));

  expect(OBJECT_STRING_TAG.INT_16_ARRAY).toBe(objectToStringTag(new Int16Array));

  expect(OBJECT_STRING_TAG.UINT_16_ARRAY).toBe(objectToStringTag(new Uint16Array));

  expect(OBJECT_STRING_TAG.INT_32_ARRAY).toBe(objectToStringTag(new Int32Array));

  expect(OBJECT_STRING_TAG.UINT_32_ARRAY).toBe(objectToStringTag(new Uint32Array));

  expect(OBJECT_STRING_TAG.FLOAT_32_ARRAY).toBe(objectToStringTag(new Float32Array));

  expect(OBJECT_STRING_TAG.FLOAT_64_ARRAY).toBe(objectToStringTag(new Float64Array));

  expect(OBJECT_STRING_TAG.BIG_INT_64_ARRAY).toBe(objectToStringTag(new BigInt64Array));

  expect(OBJECT_STRING_TAG.BIG_UINT_64_ARRAY).toBe(objectToStringTag(new BigUint64Array));
});

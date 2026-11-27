import { type RecordT, OBJECT_CONSTRUCTOR } from "./constants/index.js";
import { mapSize, setSize } from "./internal/collection-size.js";
import { isArguments } from "./is-arguments.js";
import { isArrayLike } from "./is-array-like.js";
import { isArray } from "./is-array.js";
import { isBuffer } from "./is-buffer.js";
import { isFunction } from "./is-function.js";
import { isNil } from "./is-nil.js";
import { isPrototype } from "./is-prototype.js";
import { isString } from "./is-string.js";
import { isTypedArray } from "./is-typed-array.js";
import { prototypeKeys } from "./prototype-keys.js";

/**
 * Checks a value for elements, collection entries, or own enumerable string keys.
 *
 * @group Other
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for nullish values and empty values. Arrays, recognized arguments objects,
 * buffers, typed arrays, strings, and array-like objects with a function-valued `splice`
 * are checked by length. Maps and sets are checked by their intrinsic size, including across realms. Other objects
 * are checked for own enumerable string keys, ignoring `constructor` on recognized
 * constructor prototypes. Property reads can invoke getters or throw.
 * @see {@link https://lodash.com/docs/4.18.1#isEmpty | Lodash isEmpty} as `_.isEmpty(value)`.
 * A boxed string with its own enumerable keys can be nonempty in Lodash even when
 * its length is zero.
 * @example
 * isEmpty(null); // => true
 * isEmpty(new Set()); // => true
 * isEmpty({ a: 1 }); // => false
 * isEmpty([1]); // => false
 */
export function isEmpty(value: unknown): boolean {
  if (isNil(value)) return true;

  const isArr = isArray(value);
  const size = isArr ? void 0 : mapSize(value) ?? setSize(value);

  if (size !== void 0) return size === 0;

  if (
    isArrayLike(value)
    && (
      isArr
      || isString(value)
      || isFunction((value as RecordT).splice)
      || isBuffer(value)
      || isTypedArray(value)
      || isArguments(value)
    )
  ) {
    // oxlint-disable-next-line unicorn/explicit-length-check -- Preserve truthiness for a second read of length.
    return !value.length;
  }

  // oxlint-disable-next-line unicorn/explicit-length-check -- Preserve the existing truthiness check.
  if (isPrototype(value)) return !prototypeKeys(value).length;

  for (const key in value as RecordT) if (OBJECT_CONSTRUCTOR.hasOwn(value, key)) return false;

  return true;
}

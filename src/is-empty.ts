import { hasOwn, prototypeKeys, type RecordT } from "./internals/index.js";
import { isArguments } from "./is-arguments.js";
import { isArrayLike } from "./is-array-like.js";
import { isArray } from "./is-array.js";
import { isBuffer } from "./is-buffer.js";
import { isFunction } from "./is-function.js";
import { isMap } from "./is-map.js";
import { isNil } from "./is-nil.js";
import { isPrototype } from "./is-prototype.js";
import { isSet } from "./is-set.js";
import { isString } from "./is-string.js";
import { isTypedArray } from "./is-typed-array.js";

/**
 * Checks if the provided `value` is an empty array, string, object, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings,
 * or jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 * @group Other
 * @since 1.0.0
 * @param value
 * @example
 *isEmpty(null);
 * // => true
 * @example
 *isEmpty(true);
 * // => true
 * @example
 *isEmpty(1);
 * // => true
 * @example
 *isEmpty([1, 2, 3]);
 * // => false
 * @example
 *isEmpty({ a: 1 });
 * // => false
 */
export function isEmpty(value: unknown): boolean {
  if (isNil(value)) return true;

  if (
    isArrayLike(value)
    && (
      isArray(value)
      || isString(value)
      || isFunction((value as RecordT).splice)
      || isBuffer(value)
      || isTypedArray(value)
      || isArguments(value)
    )
  ) return !(value as RecordT).length;

  if (isMap(value) || isSet(value)) return !value.size;

  if (isPrototype(value)) return !prototypeKeys(value).length;

  for (const key in value as RecordT) if (hasOwn(value as RecordT, key)) return false;

  return true;
}

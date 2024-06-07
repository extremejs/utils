import { OBJECT_CONSTRUCTOR, type RecordT } from "./constants/index.js";
import { hasOwn } from "./has-own.js";
import { isArguments } from "./is-arguments.js";
import { isArrayLike } from "./is-array-like.js";
import { isArray } from "./is-array.js";
import { isBuffer } from "./is-buffer.js";
import { isIndex } from "./is-index.js";
import { isPrototype } from "./is-prototype.js";
import { isTypedArray } from "./is-typed-array.js";
import { prototypeKeys } from "./prototype-keys.js";

/**
 * Returns `value`'s keys.
 * @group Object
 * @since 1.0.0
 * @param value
 * @example
 * keys({ a: 0, b: 1, c: 2 }); // => ["a", "b", "c"]
 * @example
 * function Foo() {
 *   this.a = 1
 *   this.b = 2
 * }
 *
 * Foo.prototype.c = 3
 *
 * keys(new Foo) // => ["a", "b"] (iteration order is not guaranteed)
 * @example
 * keys("hi") // => ["0", "1"]
 */
export function keys(value: unknown): PropertyKey[] {
  if (isArrayLike(value)) {
    const isArr = isArray(value);
    const isArg = !isArr && isArguments(value);
    const isBuff = !isArr && !isArg && isBuffer(value);
    const isType = !isArr && !isArg && !isBuff && isTypedArray(value);
    const skipIndexes = isArr || isArg || isBuff || isType;
    const length = (value as { length: number }).length;
    const result = new Array(skipIndexes ? length : 0);

    let index = skipIndexes ? -1 : length;

    while (++index < length) result[index] = `${ index }`;

    for (const key in value as RecordT) {
      if (
        hasOwn(value as RecordT, key)
        && !(
          skipIndexes && (

            // Safari 9 has enumerable `arguments.length` in strict mode.
            (
              key === "length"

              // Skip index properties.
              || isIndex(key, length)
            )
          )
        )
      ) result.push(key);
    }

    return result;
  }

  // eslint-disable-next-line new-cap
  if (!isPrototype(value)) return OBJECT_CONSTRUCTOR.keys(OBJECT_CONSTRUCTOR(value));

  return prototypeKeys(value);
}

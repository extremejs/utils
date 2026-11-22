import { type RecordT, OBJECT_CONSTRUCTOR } from "./constants/index.js";
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
 * Lists own enumerable string keys.
 *
 * For arrays, arguments objects, buffers, and typed arrays, the list begins
 * with every in-range index as a string, including sparse holes. Prototype
 * objects omit their constructor key on the prototype-enumeration path.
 * Primitives are boxed. Nullish values yield an empty array.
 *
 * @group Object
 * @since 1.0.0
 * @param value The value whose keys to list.
 * @returns A fresh array of string keys. Inherited keys and symbols are excluded.
 * @see {@link https://lodash.com/docs/4.18.1#keys | Lodash keys} as `_.keys(value)`.
 * Both cover ordinary objects and dense-style index enumeration. Lodash additionally
 * filters certain legacy enumerable buffer and typed-array metadata.
 * @example
 * keys({ a: 0, b: 1 }); // => ["a", "b"]
 * @example
 * keys("hi"); // => ["0", "1"]
 */
export function keys(value: unknown): PropertyKey[] {
  if (isArrayLike(value)) {
    const isArr = isArray(value);
    const isArg = !isArr && isArguments(value);
    const isBuff = !isArr && !isArg && isBuffer(value);
    const isType = !isArr && !isArg && !isBuff && isTypedArray(value);
    const skipIndexes = isArr || isArg || isBuff || isType;

    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    const length = (value as { length: number; }).length;
    const result = Array.from({ length: skipIndexes ? length : 0 });

    let index = skipIndexes ? -1 : length;

    while (++index < length) result[index] = `${ index }`;

    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    for (const key in value as RecordT) {
      if (

        // oxlint-disable-next-line typescript/no-unsafe-type-assertion
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

    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    return result as never;
  }

  if (!isPrototype(value)) return OBJECT_CONSTRUCTOR.keys(OBJECT_CONSTRUCTOR(value));

  return prototypeKeys(value);
}

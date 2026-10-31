import { MAX_SAFE_INTEGER } from "./is-safe-integer.js";
import { isTypeOf } from "./is-type-of.js";
import { TYPE } from "./type-of.js";

/** Used to detect unsigned integer values. */
const UINT_REGEX = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 * @group Other
 * @since 1.0.0
 * @param value
 * @param length
 * @example
 * isIndex(0); // => true
 * @example
 * isIndex(10); // => true
 * @example
 * isIndex("10"); // => true
 * @example
 * isIndex("foo"); // => false
 */
export function isIndex(value: unknown, length = MAX_SAFE_INTEGER): boolean {
  return !!length
    && (
      isTypeOf(value, TYPE.NUMBER)
      || (
        !isTypeOf(value, TYPE.SYMBOL)

        // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Preserve JavaScript coercion of index values.
        && UINT_REGEX.test(value as string)
      )
    )
    && (

      // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Preserve JavaScript coercion of index values.
      (value as number) > -1

      // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Preserve JavaScript coercion of index values.
      && (value as number) % 1 === 0

      // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Preserve JavaScript coercion of index values.
      && (value as number) < length
    );
}

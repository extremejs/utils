import { MAX_SAFE_INTEGER } from "./is-safe-integer.js";
import { isTypeOf } from "./is-type-of.js";
import { TYPE } from "./type-of.js";

/** Used to detect unsigned integer values. */
const UINT_REGEX = /^(?:0|[1-9]\d*)$/;

/**
 * Checks whether a value represents an integer index within an array-like length.
 *
 * Numeric indices and unsigned decimal strings are accepted. Use canonical
 * strings such as `"10"`, with no leading zeros except in `"0"`. Other
 * values can invoke JavaScript coercion, which can throw.
 *
 * @group Other
 * @since 1.0.0
 * @param value The candidate index.
 * @param length The exclusive upper bound. Defaults to `Number.MAX_SAFE_INTEGER`.
 * @returns Whether the candidate represents an integer from zero up to the exclusive bound.
 * @example
 * isIndex(0); // => true
 * @example
 * isIndex("10"); // => true
 * @example
 * isIndex(3, 3); // => false
 * @example
 * isIndex("01"); // => false
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

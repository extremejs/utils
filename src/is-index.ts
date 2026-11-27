import { MAX_SAFE_INTEGER } from "./is-safe-integer.js";

/** Used to detect unsigned integer values. */
const UINT_REGEX = /^(?:0|[1-9]\d*)$/;

/**
 * Checks whether a value represents an integer index within an array-like length.
 *
 * Numeric indices and unsigned decimal strings are accepted. Use canonical
 * strings such as `"10"`, with no leading zeros except in `"0"`. Other
 * candidate types return `false` without coercion.
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
 * @example
 * isIndex(1n); // => false
 */
export function isIndex(value: unknown, length = MAX_SAFE_INTEGER): boolean {
  if (typeof value === "number") return Number.isInteger(value) && value >= 0 && value < length;
  if (typeof value !== "string" || !UINT_REGEX.test(value)) return false;

  const index = Number(value);

  // A rounded decimal can only cross the exclusive bound when it rounds to the bound.
  return index < length || (index === length && (length === Infinity || BigInt(value) < length));
}

/**
 * It will determine whether the provided `value` is a safe integer or not.
 * @group Number
 * @since 1.0.0
 * @param value
 * @example
 * isSafeInteger(2);
 * // => true
 * @example
 * isSafeInteger(Number.MIN_VALUE);
 * // => false
 */
export default function isSafeInteger(value: unknown): value is number {
  return Number.isSafeInteger(value);
}

/**
 *
 * @group Number
 */
export const MIN_SAFE_INTEGER = -9_007_199_254_740_991;

/**
 *
 * @group Number
 */
export const MAX_SAFE_INTEGER = 9_007_199_254_740_991;

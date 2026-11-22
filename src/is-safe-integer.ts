/**
 * Checks whether a value is a primitive integer within the safe integer range.
 *
 * @group Number
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for integers from `Number.MIN_SAFE_INTEGER` through
 * `Number.MAX_SAFE_INTEGER`, inclusive. Strings and boxed numbers return `false`.
 * @see {@link https://lodash.com/docs/4.18.1#isSafeInteger | Lodash isSafeInteger} as `_.isSafeInteger(value)`.
 * @example
 * isSafeInteger(Number.MAX_SAFE_INTEGER); // => true
 * isSafeInteger(Number.MAX_SAFE_INTEGER + 1); // => false
 */
export function isSafeInteger(value: unknown): value is number {
  return Number.isSafeInteger(value);
}

/**
 * The smallest safe integer, equal to `Number.MIN_SAFE_INTEGER`.
 * @group Number
 */
export const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER;

/**
 * The largest safe integer, equal to `Number.MAX_SAFE_INTEGER`.
 * @group Number
 */
export const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;

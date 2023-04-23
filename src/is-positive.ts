/**
 * Checks if `number` is positive.
 * @group Number
 * @since 1.0.0
 * @param number
 * @example
 * isPositive(2);
 * // => true
 * @example
 * isPositive(0);
 * // => true
 * @example
 * isPositive(-0);
 * // => false
 * @example
 * isPositive(-2);
 * // => false
 */
export function isPositive(number: number): boolean {
  return number === 0 ? 1 / number === Infinity : number > 0;
}

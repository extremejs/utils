/**
 * Checks whether a number is an odd integer.
 *
 * @group Number
 * @since 1.0.0
 * @param number The number to check.
 * @returns Whether the number is odd. Both positive and negative odd integers pass.
 * Fractions, infinities, and `NaN` fail.
 * @example
 * isOdd(3); // => true
 * isOdd(-3); // => true
 * @example
 * isOdd(2); // => false
 * @example
 * isOdd(1.1); // => false
 */
export function isOdd(number: number): boolean {
  return Math.abs(number % 2) === 1;
}

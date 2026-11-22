/**
 * Checks whether a number is divisible by two.
 *
 * @group Number
 * @since 1.0.0
 * @param number The number to check.
 * @returns Whether the remainder after division by two is zero. Both signed zeros pass.
 * Fractions, infinities, and `NaN` fail.
 * @example
 * isEven(-2); // => true
 * @example
 * isEven(2.2); // => false
 */
export function isEven(number: number): boolean {
  return number % 2 === 0;
}

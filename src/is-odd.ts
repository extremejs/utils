/**
 * Checks whether the remainder after division by two is one.
 *
 * @group Number
 * @since 1.0.0
 * @param number The number to check.
 * @returns Whether the remainder is one. Negative odd inputs currently return `false`.
 * @example
 * isOdd(3); // => true
 * @example
 * isOdd(2); // => false
 * @example
 * isOdd(1.1); // => false
 */
export function isOdd(number: number): boolean {
  return number % 2 === 1;
}

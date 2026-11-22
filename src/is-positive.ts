/**
 * Checks a number's sign, including the sign of zero.
 *
 * @group Number
 * @since 1.0.0
 * @param number The number to check.
 * @returns `true` for positive numbers, including positive infinity and positive zero.
 * Negative zero and `NaN` return `false`.
 * @example
 * isPositive(2); // => true
 * @example
 * isPositive(0); // => true
 * @example
 * isPositive(-0); // => false
 */
export function isPositive(number: number): boolean {
  return number === 0 ? 1 / number === Infinity : number > 0;
}

/**
 * It will determine whether the provided `number` is an odd number or not.
 * @group Number
 * @since 1.0.0
 * @param number
 * @example
 * isOdd(3); // => true
 * @example
 * isOdd(5.0); // => true
 * @example
 * isOdd(2); // => false
 * @example
 * isOdd(1.1); // => false
 */
export function isOdd(number: number): boolean {
  return number % 2 === 1;
}

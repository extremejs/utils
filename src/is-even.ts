/**
 * It will determine whether the provided `number` is an even number or not.
 * @group Number
 * @since 1.0.0
 * @param number
 * @example
 * isEven(2);
 * // => true
 * @example
 * isEven(3);
 * // => false
 */
export default function isEven(number: number): boolean {
  return number % 2 === 0;
}

/**
 * It will determine whether the provided `number` is an even number or not.
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

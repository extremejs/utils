/**
 * Divides two numbers.
 *
 * Corresponds to Lodash's `divide(dividend, divisor)` with two numeric operands.
 * Both operands are required. Lodash also supports omitted and nonnumeric operands.
 *
 * @group Math
 * @since 1.0.0
 * @param dividend The number to divide.
 * @param divisor The number to divide by.
 * @returns The quotient. A nonzero dividend divided by zero gives signed infinity.
 * Zero divided by zero gives `NaN`.
 * @see {@link https://lodash.com/docs/4.18.1#divide | Lodash divide}
 * @example
 * divide(5, 2); // => 2.5
 */
export function divide(dividend: number, divisor: number): number {
  return dividend / divisor;
}

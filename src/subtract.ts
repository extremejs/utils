/**
 * Subtracts one number from another.
 *
 * Corresponds to Lodash's `subtract(minuend, subtrahend)` with two numeric operands.
 * Both operands are required. Lodash also supports omitted and nonnumeric operands.
 *
 * @group Math
 * @since 1.0.0
 * @param minuend The number to subtract from.
 * @param subtrahend The number to subtract.
 * @returns The difference.
 * @see {@link https://lodash.com/docs/4.18.1#subtract | Lodash subtract}
 * @example
 * subtract(5, 2); // => 3
 */
export function subtract(minuend: number, subtrahend: number): number {
  return minuend - subtrahend;
}

/**
 * Multiplies two numbers.
 *
 * Corresponds to Lodash's `multiply(multiplier, multiplicand)` with two numeric operands.
 * Both operands are required. Lodash also supports omitted and nonnumeric operands.
 *
 * @group Math
 * @since 1.0.0
 * @param multiplier The first factor.
 * @param multiplicand The second factor.
 * @returns The product.
 * @see {@link https://lodash.com/docs/4.18.1#multiply | Lodash multiply}
 * @example
 * multiply(5, 2); // => 10
 */
export function multiply(multiplier: number, multiplicand: number): number {
  return multiplier * multiplicand;
}

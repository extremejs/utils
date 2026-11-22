/**
 * Adds two numbers.
 *
 * Corresponds to Lodash's `add(augend, addend)` with two numeric operands.
 * Both operands are required. Lodash also supports omitted and nonnumeric operands.
 *
 * @group Math
 * @since 1.0.0
 * @param augend The number to add to.
 * @param addend The number to add.
 * @returns The sum.
 * @see {@link https://lodash.com/docs/4.18.1#add | Lodash add}
 * @example
 * add(5, 2); // => 7
 */
export function add(augend: number, addend: number): number {
  return augend + addend;
}

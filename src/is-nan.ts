/**
 * Checks whether a value is the primitive number `NaN`.
 *
 * @group Number
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` only for primitive `NaN`. Other values return `false` without coercion.
 * @see {@link https://lodash.com/docs/4.18.1#isNaN | Lodash isNaN} as `_.isNaN(value)`. Lodash also accepts boxed `NaN`.
 * @example
 * isNaN(Number.NaN); // => true
 * isNaN(Object(Number.NaN)); // => false
 */
export function isNaN(value: unknown): boolean {
  return Number.isNaN(value);
}

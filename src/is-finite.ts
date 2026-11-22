/**
 * Checks whether a value is a finite primitive number.
 *
 * @group Number
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for finite primitive numbers, including fractions and signed zeros.
 * Infinities, `NaN`, boxed numbers, and numeric strings return `false`.
 * @see {@link https://lodash.com/docs/4.18.1#isFinite | Lodash isFinite} as `_.isFinite(value)`.
 * @example
 * isFinite(3.14); // => true
 * isFinite(Infinity); // => false
 */
export function isFinite(value: unknown): value is number {
  return Number.isFinite(value);
}

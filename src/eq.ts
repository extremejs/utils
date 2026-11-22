/**
 * Compares two values using [SameValueZero](https://tc39.es/ecma262/#sec-samevaluezero).
 *
 * @group Other
 * @since 1.0.0
 * @param value The first value to compare.
 * @param other The second value to compare.
 * @returns `true` for equal primitives or the same object reference. Both signed zeros compare equal,
 * and `NaN` compares equal to itself. No coercion or deep comparison is performed.
 * @see {@link https://lodash.com/docs/4.18.1#eq | Lodash eq} as `_.eq(value, other)`.
 * @example
 * eq(0, -0); // => true
 * eq(Number.NaN, Number.NaN); // => true
 * eq(1, "1"); // => false
 * eq({ a: 1 }, { a: 1 }); // => false
 */
export function eq(value: unknown, other: unknown): boolean {
  // oxlint-disable-next-line no-self-compare
  return value === other || (value !== value && other !== other);
}

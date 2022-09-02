/**
 * Performs a [SameValueZero](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 * @group Other
 * @since 1.0.0
 * @param value
 * @param other
 * @example
 * const object = { a: 1 };
 * const other = { a: 1 };
 *
 * eq(object, object);
 * // => true
 *
 * eq(object, other);
 * // => false
 * @example
 * eq('a', 'a');
 * // => true
 * @example
 * eq('a', Object('a'));
 * // => false
 * @example
 * eq(NaN, NaN);
 * // => true
 */
export default function eq(value: unknown, other: unknown): boolean {
  // eslint-disable-next-line no-self-compare
  return value === other || (value !== value && other !== other);
}

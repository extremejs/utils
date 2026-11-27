/**
 * Checks for a non-null object or function, including across realms.
 *
 * @group Object
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for matching objects, including arrays, boxed primitives, and functions.
 * Null-prototype objects are included. Nullish values and primitives return `false`.
 * @see {@link https://lodash.com/docs/4.18.1#isObject | Lodash isObject} as `_.isObject(value)`.
 * @example
 * isObject([]); // => true
 * isObject(() => 0); // => true
 * isObject(Object.create(null)); // => true
 */
export function isObject(value: unknown): value is object {
  return (typeof value === "object" && value !== null) || typeof value === "function";
}

import { type RecordT, OBJECT_CONSTRUCTOR } from "./constants/index.js";

/**
 * Lists all own string property names using `Object.getOwnPropertyNames`.
 *
 * The result includes non-enumerable names such as an array's `length`.
 * Inherited keys, symbols, and sparse holes are excluded.
 *
 * @group Object
 * @since 1.0.0
 * @param value The object whose property names to list.
 * @returns A fresh array of own string property names.
 * @see {@link https://lodash.com/docs/4.18.1#keys | Lodash keys} as `_.keys(value)` for
 * ordinary objects whose own string properties are all enumerable. Use
 * `Object.getOwnPropertyNames(value)` for the full behavior.
 * @example
 * ownKeys([10]); // => ["0", "length"]
 */
export function ownKeys(value: RecordT): PropertyKey[] {
  return OBJECT_CONSTRUCTOR.getOwnPropertyNames(value);
}

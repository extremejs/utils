import { OBJECT_CONSTRUCTOR, type RecordT } from "./constants/index.js";

/**
 * Returns the direct properties of the `value` based on `Object.getOwnPropertyNames` result.
 * @group Object
 * @since 1.0.0
 * @param value The object that contains the own properties.
 * @returns The direct properties.
 * @example
 * ownKeys({ a: 2 }); // => "a"
 */
export function ownKeys(value: RecordT): PropertyKey[] {
  return OBJECT_CONSTRUCTOR.getOwnPropertyNames(value);
}

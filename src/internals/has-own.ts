import OBJECT_PROTOTYPE from "./OBJECT_PROTOTYPE.js";
import { RecordT } from "./typescript.js";

/**
 * Checks if `value` has the specified `key` as its own property based on `Object.prototype.hasOwnProperty` result.
 * @group Object
 * @since 1.0.0
 * @param value
 * @param key
 * @example
 * hasOwn({ a: 2 }, "a");
 * // => true
 */
export default function hasOwn(value: RecordT, key: PropertyKey): boolean {
  return OBJECT_PROTOTYPE.hasOwnProperty.call(value, key);
}

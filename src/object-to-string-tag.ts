import objectToString, { ObjectStringTagT } from "./object-to-string.js";
import slice from "./slice.js";

/**
 * Converts `value` to a string tag using `Object.prototype.toString`.
 * @group Other
 * @since 1.0.0
 * @param value
 * @example
 * objectToStringTag({});
 * // => "Object"
 * @example
 * objectToStringTag(2);
 * // => "Number"
 */
export default function objectToStringTag(value: unknown): ObjectStringTagT {
  return slice(objectToString(value), 8, -1) as never;
}

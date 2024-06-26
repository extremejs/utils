import { type OBJECT_STRING_TAG, objectToString } from "./object-to-string.js";
import { slice } from "./slice.js";

/**
 * Converts `value` to a string tag using `Object.prototype.toString`.
 * @group Other
 * @since 1.0.0
 * @param value
 * @example
 * objectToStringTag({}); // => "Object"
 * @example
 * objectToStringTag(2); // => "Number"
 */
export function objectToStringTag(value: unknown): OBJECT_STRING_TAG {
  return slice(objectToString(value), 8, -1) as never;
}

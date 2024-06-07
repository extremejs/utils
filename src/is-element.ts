import { isObjectLike } from "./is-object-like.js";
import { isPlainObject } from "./is-plain-object.js";

/**
 * Checks if `value` is likely a `DOM` element.
 * @group Other
 * @since 1.0.0
 * @param value
 * @example
 * isElement(document.body); // => true
 * @example
 * isElement("<body>"); // => false
 */
export function isElement(value: unknown): value is Element {
  return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
}

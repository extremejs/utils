import { isObjectLike } from "./is-object-like.js";
import { isPlainObject } from "./is-plain-object.js";

/**
 * Checks whether a non-null, non-plain object has a numeric `nodeType` of `1`.
 *
 * This heuristic can accept element-like class instances. Reading `nodeType`
 * or inspecting the prototype can invoke getters or proxy traps.
 *
 * @group Other
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` if the value satisfies the element heuristic.
 * @see {@link https://lodash.com/docs/4.18.1#isElement | Lodash isElement} as `_.isElement(value)`. Both use `nodeType` and their respective plain-object checks. Objects with a custom null-prototype root can differ.
 * @example
 * isElement(document.body); // => true
 * isElement({ nodeType: 1 }); // => false
 */
export function isElement(value: unknown): value is Element {
  return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
}

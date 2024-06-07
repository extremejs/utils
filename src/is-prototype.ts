import { OBJECT_PROTOTYPE } from "./constants/index.js";
import { isFunction } from "./is-function.js";

/**
 * Checks if `value` is likely a prototype object.
 * @group Object
 * @since 1.0.0
 * @param value
 * @example
 * isPrototype(Object.prototype); // => true
 */
export function isPrototype(value: unknown): boolean {
  const constructor = value?.constructor;

  const prototype = (isFunction(constructor) && constructor.prototype) || OBJECT_PROTOTYPE;

  return value === prototype;
}

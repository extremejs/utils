import { OBJECT_PROTOTYPE } from "./constants/index.js";
import { isFunction } from "./is-function.js";

/**
 * Checks whether a value is the prototype of its function-valued constructor.
 *
 * When the constructor provides no usable prototype, the comparison uses
 * `Object.prototype`. The check uses identity and can invoke a constructor getter.
 *
 * @group Object
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` if the value equals the selected prototype.
 * @example
 * isPrototype(Object.prototype); // => true
 * isPrototype({}); // => false
 */
export function isPrototype(value: unknown): boolean {
  const constructor = value?.constructor;

  // oxlint-disable-next-line typescript/prefer-nullish-coalescing -- Preserve fallback for all falsy prototype values.
  const prototype = (isFunction(constructor) && constructor.prototype) || OBJECT_PROTOTYPE;

  return value === prototype;
}

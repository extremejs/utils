import { RecordT } from "./get.js";
import isNull from "./is-null.js";
import isObjectLike from "./is-object-like.js";

/**
 * Checks if `value` is a plain object,
 * that is, an object created by the `Object` constructor or one with a `[[Prototype]]` of `null`.
 * @since 1.0.0
 * @param value
 * @example
 * isPlainObject(new Foo);
 * // => false
 * @example
 * isPlainObject([1, 2, 3]);
 * // => false
 * @example
 * isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 * @example
 * isPlainObject(Object.create(null));
 * // => true
 */
export default function isPlainObject(value: unknown): value is RecordT {
  if (!isObjectLike(value)) return false;

  if (isNull(Object.getPrototypeOf(value))) return true;

  let proto = value;

  while (!isNull(Object.getPrototypeOf(proto))) proto = Object.getPrototypeOf(proto);

  return Object.getPrototypeOf(value) === proto;
}

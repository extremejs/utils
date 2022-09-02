import { RecordT } from "./get.js";
import isNull from "./is-null.js";
import isObjectLike from "./is-object-like.js";
import prototypeOf from "./prototype-of.js";

/**
 * Checks if `value` is a plain object,
 * that is, an object created by the `Object` constructor or one with a `[[Prototype]]` of `null`.
 * @group Object
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

  if (isNull(prototypeOf(value))) return true;

  let proto = value;

  while (!isNull(prototypeOf(proto))) proto = prototypeOf(proto);

  return prototypeOf(value) === proto;
}

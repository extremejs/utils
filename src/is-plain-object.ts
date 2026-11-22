import { type RecordT } from "./constants/index.js";
import { isNull } from "./is-null.js";
import { isObjectLike } from "./is-object-like.js";
import { prototypeOf } from "./prototype-of.js";

/**
 * Checks whether a non-null object has no prototype or inherits directly from the root of its prototype chain.
 *
 * @group Object
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for ordinary object literals and null-prototype records, including
 * those from another realm. Class instances and arrays with their usual prototypes
 * return `false`. Reading the prototype can invoke a proxy trap.
 * @see {@link https://lodash.com/docs/4.18.1#isPlainObject | Lodash isPlainObject} as `_.isPlainObject(value)`. Lodash additionally checks the object tag and, when a prototype exists, its constructor.
 * @example
 * isPlainObject({ a: 1 }); // => true
 * isPlainObject(Object.create(null)); // => true
 * isPlainObject([1, 2]); // => false
 */
export function isPlainObject(value: unknown): value is RecordT {
  if (!isObjectLike(value)) return false;

  if (isNull(prototypeOf(value))) return true;

  let proto = value;

  while (!isNull(prototypeOf(proto))) proto = prototypeOf(proto);

  return prototypeOf(value) === proto;
}

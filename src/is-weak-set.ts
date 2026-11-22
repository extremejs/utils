import { type RecordT } from "./constants/index.js";
import { isInstanceOf } from "./is-instance-of.js";

/**
 * Checks whether a value is an instance of the current realm's `WeakSet` constructor.
 *
 * @group Set
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` if the local `instanceof WeakSet` check succeeds.
 * @see {@link https://lodash.com/docs/4.18.1#isWeakSet | Lodash isWeakSet} as `_.isWeakSet(value)`. Lodash also recognizes weak sets from other realms.
 * @example
 * isWeakSet(new WeakSet()); // => true
 * isWeakSet(new Set()); // => false
 */
export function isWeakSet(value: unknown): value is WeakSet<RecordT> {
  return isInstanceOf(value, WeakSet);
}

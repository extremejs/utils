import { type RecordT } from "./constants/index.js";
import { isInstanceOf } from "./is-instance-of.js";

/**
 * Checks whether a value is an instance of the current realm's `WeakMap` constructor.
 *
 * @group Map
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` if the local `instanceof WeakMap` check succeeds.
 * @see {@link https://lodash.com/docs/4.18.1#isWeakMap | Lodash isWeakMap} as `_.isWeakMap(value)`. Lodash also recognizes weak maps from other realms.
 * @example
 * isWeakMap(new WeakMap()); // => true
 * isWeakMap(new Map()); // => false
 */
export function isWeakMap(value: unknown): value is WeakMap<RecordT, unknown> {
  return isInstanceOf(value, WeakMap);
}

import { type CalculatedPathT, type CalculatedPropertyT, get } from "./get.js";
import { type RecordT } from "./internals/index.js";
import { sumByFn } from "./sum-by-fn.js";

/**
 * It will iterate through each of the provided `values` array
 * and add the value of each element's `property` to produce the desired `sum`.
 * @group Array
 * @since 1.0.0
 * @param values
 * @param property
 * @example
 * sumByProperty([{ a: 1 }, { a: 2 }, { a: 3 }], "a");
 * // => 6
 */
export function sumByProperty<Value extends RecordT>(
  values: Value[],
  property: CalculatedPropertyT<CalculatedPathT<Value>>,
): number {
  return sumByFn(values, value => get(value, property, 0 as never));
}

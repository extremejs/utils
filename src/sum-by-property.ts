import { type CalculatedPathT, type CalculatedPropertyT } from "./get.js";
import { type RecordT } from "./internals/index.js";
import { property as propertyUtil } from "./property.js";
import { sumByFn } from "./sum-by-fn.js";

/**
 * It will iterate through each element of the provided `values` array
 * and add the value of each element's `property` to produce the desired `sum`.
 * @group Math
 * @since 1.0.0
 * @param values
 * @param property
 * @example
 * sumByProperty([{ a: 1 }, { a: 2 }, { a: 3 }], "a"); // => 6
 */
export function sumByProperty<Value extends RecordT>(
  values: Value[],
  property: CalculatedPropertyT<CalculatedPathT<Value>>,
): number {
  return sumByFn(values, propertyUtil(property, 0));
}

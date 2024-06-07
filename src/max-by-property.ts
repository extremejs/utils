import { type RecordT } from "./constants/index.js";
import { type CalculatedPathT, type CalculatedPropertyT } from "./get.js";
import { maxByFn } from "./max-by-fn.js";
import { property as propertyUtil } from "./property.js";

/**
 * Computes the `maximum` of the values of the `property` for each element in the array.
 * @group Math
 * @since 1.0.0
 * @param values The array to iterate over.
 * @param property The property to get the value per element.
 * @returns The maximum value.
 * @example
 * maxByProperty([{ a: 1 }, { a: 2 }, { a: 3 }], "a"); // => 3
 */
export function maxByProperty<Value extends RecordT>(
  values: Value[],
  property: CalculatedPropertyT<CalculatedPathT<Value>>,
): number {
  return maxByFn(values, propertyUtil(property, -Infinity));
}

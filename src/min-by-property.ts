import { type CalculatedPathT, type CalculatedPropertyT } from "./get.js";
import { type RecordT } from "./internals/index.js";
import { minByFn } from "./min-by-fn.js";
import { property as propertyUtil } from "./property.js";

/**
 * Computes the `minimum` of the values of the `property` for each element in the array.
 * @group Array
 * @since 1.0.0
 * @param values The array to iterate over.
 * @param property The property to get the value per element.
 * @returns The minimum value.
 * @example
 * minByProperty([{ a: 1 }, { a: 2 }, { a: 3 }], "a"); // => 1
 */
export function minByProperty<Value extends RecordT>(
  values: Value[],
  property: CalculatedPropertyT<CalculatedPathT<Value>>,
): number {
  return minByFn(values, propertyUtil(property, Infinity));
}

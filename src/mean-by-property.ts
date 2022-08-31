import { CalculatedPathT, CalculatedPropertyT, RecordT } from "./get.js";
import sumByProperty from "./sum-by-property.js";

/**
 * It will iterate through each of the provided `values` array
 * and add the value of each element's `property`,
 * then divide by `values.length`to produce the desired `mean`.
 * @since 1.0.0
 * @param values
 * @param property
 * @example
 * meanByProperty([{ a: 1 }, { a: 2 }, { a: 3 }], "a");
 * // => 2
 */
export default function meanByProperty<Value extends RecordT>(
  values: Value[],
  property: CalculatedPropertyT<CalculatedPathT<Value>>,
): number {
  return sumByProperty(values, property) / values.length;
}
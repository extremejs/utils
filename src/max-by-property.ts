import get, { type CalculatedPathT, type CalculatedPropertyT } from "./get.js";
import { type RecordT } from "./internals/index.js";
import maxByFn from "./max-by-fn.js";

/**
 * Computes the `maximum` of the values of the `property` for each element in the array.
 * @group Math
 * @since 1.0.0
 * @param values The array to iterate over.
 * @param property The property to get the value per element.
 * @returns The maximum value.
 * @example
 * minByProperty([{ a: 1 }, { a: 2 }, { a: 3 }], "a");
 * // => 3
 */
export default function maxByProperty<Value extends RecordT>(
  values: Value[],
  property: CalculatedPropertyT<CalculatedPathT<Value>>,
): number {
  return maxByFn(values, value => get(value, property, -Infinity as never));
}

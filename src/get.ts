import { type RecordT } from "./constants/index.js";
import { type PathT, type PropertyT, toPath } from "./to-path.js";

/**
 * It will return the desired `value` based on the provided `property`.
 * @group Object
 * @since 1.0.0
 * @param value
 * @param property
 * @param fallback
 * @example
 * get({ a: { b: [{ c: { d: 1 } }] } }, "a.b.0.c.d"); // => 1
 * @example
 * get({ a: { b: [{ c: { d: 2 } }] } }, "a.b[0][c].d"); // => 2
 * @example
 * get({ a: { b: [{ c: { d: 1 } }] } }, "a.b.0.c.e"); // => undefined
 * @example
 * get({ a: { b: [{ c: { d: 1 } }] } }, "a.b.0.c.d", 3); // => 3
 */
export function get<
  Value extends RecordT,
  Property extends CalculatedPropertyT<CalculatedPathT<Value>>,
  Fallback extends ValueAtT<Value, PathT<Property>> | null | undefined,
>(value: Value, property: Property, fallback?: Fallback): Fallback | ValueAtT<Value, PathT<Property>> {
  return toPath(property)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .reduce<any>((previousValue, currentValue) => previousValue?.[currentValue], value) ?? fallback;
}

/**
 *
 * @group Object
 */
export type CalculatedPathT<Value> = Value extends Array<infer Element>
  ? [`${ number }`, ...CalculatedPathT<Element>] | [`${ number }`]
  : Value extends RecordT
    ? {
        [Key in keyof Value]: [Key, ...CalculatedPathT<Value[Key]>] | [Key];
      }[keyof Value]
    : [];

/**
 *
 * @group Object
 */
export type CalculatedPropertyT<Path extends unknown[]> = Path extends []
  ? never
  : Path extends [infer First]
    ? Extract<First, PropertyT>
    : Path extends [...infer Initial, infer Last]
      ? Last extends string
        ? Initial extends PropertyT[]
          ? `${ CalculatedPropertyT<Initial> }${ `.${ Extract<Last, PropertyT> }` | `[${ Extract<Last, PropertyT> }]` }`
          : never
        : never
      : never;

/**
 *
 * @group Object
 */
export type ValueAtT<Value, Path extends unknown[]> = Path extends [infer First]
  ? First extends keyof Value
    ? Value[First]
    : First extends `${ number }`
      ? Value extends Array<infer Element>
        ? Element
        : never
      : never
  : Path extends [infer First, ...infer Rest]
    ? First extends keyof Value
      ? ValueAtT<Value[First], Rest>
      : First extends `${ number }`
        ? Value extends Array<infer Element>
          ? ValueAtT<Element, Rest>
          : never
        : never
    : never;

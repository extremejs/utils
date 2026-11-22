import { type RecordT } from "./constants/index.js";
import { type PathT, type PropertyT, toPath } from "./to-path.js";

/**
 * Reads the value at a property path, including inherited properties.
 *
 * String paths use dots and simple unquoted brackets after a key, such as
 * `"items[0].score"`. Use string indices for arrays. For object keys declared
 * as numbers or symbols, pass the key directly. An array of path segments is
 * outside the signature. For the string syntax, see {@link toPath}.
 *
 * @group Object
 * @since 1.0.0
 * @typeParam Value The object or array being read.
 * @typeParam Property A path inferred from `Value`.
 * @typeParam Fallback A value compatible with the selected property's type, or nullish.
 * @param value The object or array to read.
 * @param property The property key or path to read.
 * @param fallback The value to return for a missing or nullish result. Defaults to `undefined`.
 * @returns The selected value or the fallback. Property reads can invoke getters and propagate their errors.
 * @see {@link https://lodash.com/docs/4.18.1#get | Lodash get} as `_.get(value, property, fallback)`.
 * Lodash accepts segment arrays, prefers an existing literal key over a parsed path,
 * distinguishes numeric `-0` from `0`, and applies its default only to `undefined`.
 * @example
 * get({ items: [{ score: 2 }] }, "items[0].score"); // => 2
 * @example
 * get({ items: [{ score: 2 }] }, "items[1].score", 0); // => 0
 */
export function get<
  Value extends RecordT,
  Property extends CalculatedPropertyT<CalculatedPathT<Value>>,
  Fallback extends ValueAtT<Value, PathT<Property>> | null | undefined,
>(value: Value, property: Property, fallback?: Fallback): Fallback | ValueAtT<Value, PathT<Property>> {
  return toPath(property)

    // oxlint-disable-next-line typescript/no-explicit-any
    .reduce<any>((previousValue, currentValue) => previousValue?.[currentValue], value) ?? fallback;
}

/**
 * Computes key tuples for a value. Array indices use numeric strings.
 * @group Object
 * @typeParam Value The object, array, or leaf type.
 */
export type CalculatedPathT<Value> = Value extends Array<infer Element>
  ? [`${ number }`, ...CalculatedPathT<Element>] | [`${ number }`]
  : Value extends RecordT
    ? {
        [Key in keyof Value]: [Key, ...CalculatedPathT<Value[Key]>] | [Key];
      }[keyof Value]
    : [];

/**
 * Turns a supported key tuple into a direct key or dot/bracket path.
 * @group Object
 * @typeParam Path The path tuple to represent.
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
 * Computes the value type for a tuple of successive keys.
 * @group Object
 * @typeParam Value The starting value type.
 * @typeParam Path The tuple of keys to follow.
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

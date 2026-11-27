import { type CalculatedPathT, type CalculatedPropertyT, type ValueAtT } from "../get.js";
import { property } from "../property.js";
import { type PathT, type PropertyT } from "../to-path.js";

type NumericScoreT<Score> = unknown extends Score
  ? never
  : [Score] extends [number | null | undefined] ? NonNullable<Score> : never;

type SegmentT<Key> = Key extends number
  ? Key | `${ Key }`
  : Key extends `${ infer Index extends number }`
    ? `${ Index }` extends Key ? Key | Index : Key
    : Extract<Key, PropertyKey>;

type SegmentPathT<Path extends unknown[]> = { readonly [Index in keyof Path]: SegmentT<Path[Index]>; };

// Support paths when callers specify only the value type.
export type DefaultPropertyT<Value, Path extends unknown[] = CalculatedPathT<Value>>
  = CalculatedPropertyT<Path> | SegmentPathT<Path>;

export type NumericPropertyT<Value, Property extends PropertyT> = Property extends PropertyT
  ? NumericScoreT<ValueAtT<Value, PathT<Property>>> extends never ? never : Property
  : never;

export function numericProperty<Fallback extends number | undefined>(
  path: PropertyT,
  fallback: Fallback,
): (value: unknown) => number | Fallback {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Public selectors require a numeric path.
  return property(path, fallback) as (value: unknown) => number | Fallback;
}

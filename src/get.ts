import { type RecordT } from "./constants/index.js";
import { type FallbackArgsT, type ReadResultT, readPath } from "./internal/read-path.js";
import { type PathT, type PropertyT, toPath } from "./to-path.js";

type EquivalentKeyT<Key> = Key extends number
  ? `${ Key }`
  : Key extends `${ infer Index extends number }`
    ? `${ Index }` extends Key ? Index : never
    : never;

type BracketKeyT<Key extends string | number> = Key extends "" | `${ string }${ "." | "[" | "]" }${ string }`
  ? never
  : `[${ Key }]`;

type DeclaredKeyT<Value> = keyof {
  [Key in keyof Value as Record<never, never> extends Record<Key, never> ? never : Key]: Value[Key];
};

type ValueAtKeyT<Value, Key> = Key extends PropertyKey
  ? Value extends null | undefined
    ? undefined
    : Value[KeyAtT<Value, Key>] | (Key extends DeclaredKeyT<Value> | EquivalentKeyT<DeclaredKeyT<Value>>
      ? never
      : undefined)
  : undefined;

type MatchingKeysT<Value, Key> = Extract<Key, keyof Value> | Extract<keyof Value, Key>;

type KeyAtT<Value, Key> = Key extends number
  ? `${ Key }` extends keyof Value ? `${ Key }` : MatchingKeysT<Value, Key | `${ Key }`>
  : Key extends keyof Value ? Key : MatchingKeysT<Value, Key | EquivalentKeyT<Key>>;

/**
 * Reads the value at a property path, including inherited properties.
 *
 * String paths always traverse the components described by {@link toPath}.
 * Pass a segment array for literal dots, brackets, and empty keys, or to mix
 * string, numeric, and symbol keys in one path. An empty array yields the fallback.
 *
 * @group Object
 * @since 1.0.0
 * @typeParam Value The object or array being read.
 * @typeParam Property A string path or key inferred from `Value`, or an explicit segment array.
 * @typeParam Fallback A compatible value or nullish fallback. An empty path accepts any fallback.
 * @param value The object or array to read.
 * @param property The property key or path to read.
 * @param fallback The value to return for a missing or nullish result. Defaults to `undefined`.
 * @returns The selected value or the fallback. Property reads can invoke getters and propagate their errors.
 * @see {@link https://lodash.com/docs/4.18.1#get | Lodash get} as `_.get(value, property, fallback)`.
 * Lodash prefers an existing literal key over a parsed path,
 * distinguishes numeric `-0` from `0`, and applies its default only to `undefined`.
 * @example
 * get({ items: [{ score: 2 }] }, "items[0].score"); // => 2
 * @example
 * get({ items: [{ score: 2 }] }, "items[1].score", 0); // => 0
 * @example
 * get({ "a.b": 2 }, ["a.b"]); // => 2
 */
export function get<
  Value extends RecordT,
  const Property extends CalculatedPropertyT<CalculatedPathT<Value>> | readonly PropertyKey[],
  Fallback extends (
    Property extends readonly [] ? unknown : ValueAtT<Value, PathT<Property>>
  ) | null | undefined = undefined,
>(
  value: Value,
  property: Property,
  ...fallback: FallbackArgsT<Fallback>
): ReadResultT<ValueAtT<Value, PathT<Property>>, Fallback>;
export function get(value: RecordT, property: PropertyT, fallback?: unknown): unknown {
  return readPath(value, toPath(property)) ?? fallback;
}

/**
 * Computes key tuples for a value. Array indices use numeric strings.
 * @group Object
 * @typeParam Value The object, array, or leaf type.
 */
export type CalculatedPathT<Value> = Value extends ReadonlyArray<infer Element>
  ? [`${ number }`, ...CalculatedPathT<Element>] | [`${ number }`]
  : Value extends RecordT
    ? {
        [Key in keyof Value]-?: [Key, ...CalculatedPathT<Value[Key]>] | [Key];
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
    ? Extract<First, PropertyKey>
    : Path extends [...infer Initial, infer Last]
      ? Last extends string
        ? Initial extends PropertyKey[]
          ? `${ CalculatedPropertyT<Initial> }${ `.${ Last }` | BracketKeyT<Last> }`
          : never
        : never
      : never;

/**
 * Computes the value type for a tuple of successive keys.
 * @group Object
 * @typeParam Value The starting value type.
 * @typeParam Path The tuple of keys to follow.
 */
export type ValueAtT<Value, Path extends readonly unknown[]> = Path extends readonly [infer First, ...infer Rest]
  ? Rest extends [] ? ValueAtKeyT<Value, First> : ValueAtT<ValueAtKeyT<Value, First>, Rest>
  : Path extends readonly [] ? undefined : unknown;

import { isString } from "./is-string.js";

/**
 * Splits a property key into path segments.
 *
 * Use dots and simple unquoted brackets after a key. A bracket segment can
 * contain a nonempty key without dots or brackets. String indices stay
 * strings. A number or symbol is preserved as a single segment.
 *
 * @group Object
 * @since 1.0.0
 * @typeParam Property The string, number, or symbol to convert.
 * @param property The property key or string path.
 * @returns A fresh array of path segments.
 * @see {@link https://lodash.com/docs/4.18.1#toPath | Lodash toPath} as `_.toPath(property)`.
 * Lodash also accepts segment arrays and supports quoted, escaped, and empty bracket segments.
 * It converts numeric keys to strings, including `"-0"` for negative zero.
 * @example
 * toPath("a.b[0].c[d]"); // => ["a", "b", "0", "c", "d"]
 * @example
 * toPath(0); // => [0]
 */
export function toPath<Property extends PropertyT>(property: Property): PathT<Property> {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Preserve the existing generic return type.
  if (isString(property)) return property.replaceAll(/\[(?<key>[^.[\]]+)]/g, ".$1").split(".") as PathT<Property>;

  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Preserve the existing generic return type.
  return [property] as PathT<Property>;
}

/**
 * A string, numeric, or symbol property key accepted by the parser.
 * @group Object
 */
export type PropertyT = PropertyKey;

/**
 * Computes the segment tuple for a simple property path.
 * @group Object
 * @typeParam Property The key or path to split.
 */
export type PathT<Property extends PropertyT> = Property extends ""
  ? []
  : Property extends number
    ? [Property]
    : Property extends symbol
      ? [Property]
      : Property extends `${ infer First }.${ infer Rest }`
        ? [...PathT<First>, ...PathT<Rest>]
        : Property extends `${ infer First }[${ infer Rest }`
          ? [...PathT<First>, ...PathT<Rest>]
          : Property extends `${ infer First }][${ infer Rest }`
            ? [...PathT<First>, ...PathT<Rest>]
            : Property extends `${ infer Last }]`
              ? [Last]
              : [Property];

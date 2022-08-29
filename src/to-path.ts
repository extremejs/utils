import isString from "./is-string.js";

/**
 * It will convert the provided `property` to an array of keys that'll represent the `path` of a value in an object.
 * @since 1.0.0
 * @param property
 * @example
 * toPath(0);
 * // => [0]
 * @example
 * toPath(Symbol());
 * // => [Symbol()]
 * @example
 * toPath("a.b[0].c[d]");
 * // => ["a", "b", "0", "c", "d"]
 * @example
 * toPath("a.b.0.c.d");
 * // => ["a", "b", "0", "c", "d"]
 */
export default function toPath<Property extends PropertyT>(property: Property): PathT<Property> {
  if (isString(property)) return property.replaceAll(/\[(?<key>[^.[\]]+)]/g, ".$1").split(".") as PathT<Property>;

  return [property] as PathT<Property>;
}

export type PropertyT = PropertyKey;

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

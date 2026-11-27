type ParsePathT<Path extends string> = Path extends `${ infer First }.${ infer Rest }`
  ? [...SplitPathT<ReplaceBracketsT<First>>, ...ParsePathT<Rest>]
  : SplitPathT<ReplaceBracketsT<Path>>;

// The runtime pattern only matches nonempty brackets within one dot component.
type ReplaceBracketsT<Part extends string> = Part extends `${ infer Prefix }[${ infer Key }]${ infer Rest }`
  ? Key extends `${ string }[${ string }`
    ? `${ Prefix }[${ ReplaceBracketsT<`${ Key }]${ Rest }`> }`
    : `${ Prefix }${ Key extends "" ? "[]" : `.${ Key }` }${ ReplaceBracketsT<Rest> }`
  : Part;

type SplitPathT<Path extends string> = Path extends `${ infer First }.${ infer Rest }`
  ? [First, ...SplitPathT<Rest>]
  : [Path];

/**
 * Converts a property key or explicit segment array to a fresh path.
 *
 * Dots separate components, including empty components. Simple brackets
 * insert a component containing a nonempty key without dots or brackets.
 * A leading bracket such as `"[a]"` starts with an empty component.
 * Empty brackets stay part of the key text.
 * Pass an array for literal dots, brackets, or empty keys at any position.
 * String indices stay strings, and numeric and symbol keys are preserved.
 *
 * @group Object
 * @since 1.0.0
 * @typeParam Property The key or path to convert.
 * @param property The key, string path, or array of explicit keys.
 * @returns A fresh array of path segments.
 * @see {@link https://lodash.com/docs/4.18.1#toPath | Lodash toPath} as `_.toPath(property)`.
 * Lodash supports quoted, escaped, and empty bracket segments. It converts
 * numeric keys to strings, including `"-0"` for negative zero.
 * @example
 * toPath("a.b[0].c[d]"); // => ["a", "b", "0", "c", "d"]
 * @example
 * toPath(0); // => [0]
 */
export function toPath<const Property extends PropertyT>(property: Property): PathT<Property>;
export function toPath(property: PropertyT): PropertyKey[] {
  if (typeof property === "string") return property.replaceAll(/\[(?<key>[^.[\]]+)]/g, ".$1").split(".");
  if (typeof property === "object") return [...property];

  return [property];
}

/**
 * A string path, direct property key, or readonly array of explicit keys.
 * @group Object
 */
export type PropertyT = PropertyKey | readonly PropertyKey[];

/**
 * Computes the segment tuple for a simple property path.
 * @group Object
 * @typeParam Property The key or path to split.
 */
export type PathT<Property extends PropertyT> = Property extends readonly PropertyKey[]
  ? [...Property]
  : Property extends string
    ? string extends Property ? string[] : ParsePathT<Property>
    : [Property];

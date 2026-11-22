import { type OBJECT_STRING_TAG, objectToString } from "./object-to-string.js";
import { slice } from "./slice.js";

/**
 * Extracts the tag from {@link objectToString}.
 *
 * String-valued `Symbol.toStringTag` properties are reflected in the result.
 * Reading the property can invoke a getter or proxy trap.
 * @group Other
 * @since 1.0.0
 * @param value The value to describe, including primitives and nullish values.
 * @returns The tag without the `[object …]` wrapper. Host and custom tags can
 * extend the set of tags listed in {@link OBJECT_STRING_TAG}.
 * @example
 * objectToStringTag(new Map()); // => "Map"
 * objectToStringTag({ [Symbol.toStringTag]: "Widget" }); // => "Widget"
 */
export function objectToStringTag(value: unknown): OBJECT_STRING_TAG {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Preserve the existing enum return type.
  return slice(objectToString(value), 8, -1) as never;
}

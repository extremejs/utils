import hasOwn from "./has-own.js";

/**
 * Returns `prototype`'s keys.
 * @group Object
 * @since 1.0.0
 * @param value
 */
export default function prototypeKeys(value: unknown): PropertyKey[] {
  const result = [];

  for (const key in Object(value)) if (hasOwn(value as never, key) && key !== "constructor") result.push(key);

  return result;
}

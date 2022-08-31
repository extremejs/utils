/**
 * It will determine whether the provided `value` is an instance of the provided `constructor` or not.
 * @since 1.0.0
 * @param value
 * @param constructor
 * @example
 * isInstanceOf(new Map, Map);
 * // => true
 */
export default function isInstanceOf<Constructor extends ConstructorT>(
  value: unknown,
  constructor: Constructor,
): value is InstanceType<Constructor> {
  return value instanceof constructor;
}

export type ConstructorT = new (...args: unknown[]) => unknown;

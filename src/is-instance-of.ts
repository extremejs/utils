import { FunctionT } from "./is-function.js";

/**
 * It will determine whether the provided `value` is an instance of the provided `constructor` or not.
 * @group Other
 * @since 1.0.0
 * @param value
 * @param constructor
 * @example
 * isInstanceOf(new Map, Map);
 * // => true
 */
export default function isInstanceOf<Value, Constructor extends ConstructorT | FunctionT>(
  value: Value,
  constructor: Constructor,
): value is InstanceT<Constructor> {
  return value instanceof constructor;
}

/**
 *
 * @group Other
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConstructorT = new (...args: any[]) => any;

/**
 *
 * @group Other
 */
export type InstanceT<Constructor extends ConstructorT | FunctionT> = Constructor extends ConstructorT
  ? InstanceType<Constructor>
  : Constructor extends FunctionT
    ? ReturnType<Constructor>
    : Constructor;

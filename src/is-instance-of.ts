import { type FunctionT } from "./is-function.js";

/**
 * Checks a value using JavaScript's `instanceof` operator.
 *
 * The check honors `Symbol.hasInstance` when supplied by the constructor.
 * @group Other
 * @since 1.0.0
 * @param value The value to check.
 * @param constructor The constructor or function to use on the right-hand side of `instanceof`.
 * @returns `true` if the native instance check succeeds.
 * @throws A `TypeError` when the native operator rejects the operands, such as an
 * object checked against an arrow function with no `Symbol.hasInstance` method.
 * @example
 * isInstanceOf(new Map(), Map); // => true
 * isInstanceOf({}, Map); // => false
 */
// oxlint-disable-next-line typescript/no-unnecessary-type-parameters -- Preserve the public generic signature.
export function isInstanceOf<Value, Constructor extends ConstructorT | FunctionT>(
  value: Value,
  constructor: Constructor,
): value is InstanceT<Constructor> {
  return value instanceof constructor;
}

/**
 * The type of a constructor that can be called with `new`.
 * @group Other
 */
// oxlint-disable-next-line typescript/no-explicit-any
export type ConstructorT = new (...args: any[]) => any;

/**
 * The instance type of a constructor or the return type of a callable.
 * @group Other
 */
export type InstanceT<Constructor extends ConstructorT | FunctionT> = Constructor extends ConstructorT
  ? InstanceType<Constructor>
  : Constructor extends FunctionT
    ? ReturnType<Constructor>
    : Constructor;

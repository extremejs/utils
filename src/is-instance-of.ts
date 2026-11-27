interface HasInstance { [Symbol.hasInstance](value: unknown): boolean; }

// oxlint-disable-next-line typescript/no-unsafe-function-type -- Native instanceof accepts any function as its RHS.
type InstanceTarget = Function | HasInstance;

/**
 * Checks a value using JavaScript's `instanceof` operator.
 *
 * A declared `Symbol.hasInstance` type predicate takes precedence over constructor
 * narrowing. A boolean-only hook provides a boolean result without narrowing.
 * @group Other
 * @since 1.0.0
 * @param value The value to check.
 * @param constructor The constructor, function, or object with a `Symbol.hasInstance` method.
 * @returns `true` if the native instance check succeeds.
 * @throws A `TypeError` when the native operator rejects the operands, such as an
 * object checked against an arrow function with no `Symbol.hasInstance` method.
 * @example
 * isInstanceOf(new Map(), Map); // => true
 * isInstanceOf({}, Map); // => false
 */
export function isInstanceOf<Constructor extends InstanceTarget>(
  value: unknown,
  constructor: Constructor & (unknown extends InstanceT<Constructor> ? never : unknown),
): value is InstanceT<Constructor>;
export function isInstanceOf(value: unknown, constructor: InstanceTarget): boolean;
export function isInstanceOf(value: unknown, constructor: InstanceTarget): boolean {
  return value instanceof constructor;
}

/**
 * The type of a constructor that can be called with `new`.
 * @group Other
 */
// oxlint-disable-next-line typescript/no-explicit-any
export type ConstructorT = new (...args: any[]) => any;

/**
 * The declared target of a custom instance predicate or an ordinary constructor.
 * Resolves to `unknown` when a boolean-only hook or a callable provides no instance type.
 * @group Other
 */
export type InstanceT<Constructor>
  = Constructor extends { [Symbol.hasInstance](value: unknown): value is infer Instance; }
    ? Instance
    : typeof Symbol.hasInstance extends keyof Constructor
      ? unknown
      : Constructor extends abstract new (...args: never[]) => infer Instance
        ? Instance
        : unknown;

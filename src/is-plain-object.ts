import { type RecordT } from "./constants/index.js";
import { isArguments } from "./is-arguments.js";

const objectConstructorSource = Function.prototype.toString.call(Object);
const mathAbsSource = Function.prototype.toString.call(Math.abs);
const namespaceTags = new Set(["Atomics", "Intl", "JSON", "Reflect", "Temporal", "Temporal.Now"]);

/**
 * Checks for an ordinary record with no prototype or the realm's `Object.prototype`.
 *
 * @group Object
 * @since 1.0.0
 * @param value The value to check.
 * @returns `true` for ordinary records, including null-prototype and foreign records.
 * Arrays, recognized arguments objects, built-in namespaces such as `Math`, and
 * objects with custom prototypes return `false`. Prototype and descriptor reads
 * can invoke proxy traps.
 * @see {@link https://lodash.com/docs/4.18.1#isPlainObject | Lodash isPlainObject} as `_.isPlainObject(value)`.
 * @example
 * isPlainObject({ a: 1 }); // => true
 * isPlainObject(Object.create(null)); // => true
 * isPlainObject([1, 2]); // => false
 */
export function isPlainObject(value: unknown): value is RecordT {
  if (typeof value !== "object" || value === null) return false;

  const prototype = Reflect.getPrototypeOf(value);

  if (prototype !== null && prototype !== Object.prototype) {
    const constructor: unknown = Object.getOwnPropertyDescriptor(prototype, "constructor")?.value;

    if (
      typeof constructor !== "function"
      || Function.prototype.toString.call(constructor) !== objectConstructorSource
      || constructor.prototype !== prototype
    ) return false;
  }

  if (Array.isArray(value) || isArguments(value)) return false;

  // A foreign Math retains its non-configurable PI even when its tag changes.
  if (value === Math) return false;

  const pi = Object.getOwnPropertyDescriptor(value, "PI");

  if (pi?.configurable === false && pi.enumerable === false && pi.value === Math.PI) {
    const abs: unknown = Object.getOwnPropertyDescriptor(value, "abs")?.value;

    if (typeof abs === "function" && Function.prototype.toString.call(abs) === mathAbsSource) return false;
  }

  const tag = Object.getOwnPropertyDescriptor(value, Symbol.toStringTag);

  // Standard namespace objects have read-only, non-enumerable, configurable tags.
  return !(
    tag?.enumerable === false && tag.configurable === true && tag.writable === false
    && typeof tag.value === "string" && namespaceTags.has(tag.value)
  );
}

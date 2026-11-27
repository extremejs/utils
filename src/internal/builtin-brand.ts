import type { types } from "node:util";

// Avoid a static Node-only import to keep the predicates usable in browsers.
// oxlint-disable-next-line typescript/no-unnecessary-condition -- Browsers and shims can omit these APIs.
export const nodeTypes: typeof types | undefined = globalThis.process
  ?.getBuiltinModule?.("node:util")?.types;

/** Reads an intrinsic that checks the receiver's internal slots. */
export function tryReadBuiltin<Args extends unknown[], Result>(
  read: (this: object, ...args: Args) => Result,
  value: unknown,
  ...args: Args
): Result | undefined {
  if (typeof value !== "object" || value === null) return void 0;

  try {
    return read.apply(value, args);
  } catch {
    return void 0;
  }
}

/** Gets an intrinsic accessor without reading a candidate's properties. */
// oxlint-disable-next-line typescript/no-unnecessary-type-parameters -- The caller supplies the return type.
export function builtinGetter<Result>(prototype: object, key: PropertyKey): (this: unknown) => Result {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Callers name known intrinsic accessors.
  return Object.getOwnPropertyDescriptor(prototype, key)?.get as (this: unknown) => Result;
}

/** Reads the native tag only when the value cannot override it. */
export function hasUntaggedBuiltinTag(value: unknown, tag: string): boolean {
  return typeof value === "object" && value !== null
    && !(Symbol.toStringTag in value)
    && Object.prototype.toString.call(value) === tag;
}

// The shared typed-array getter yields undefined for receivers without typed-array slots.
export const getTypedArrayTag = builtinGetter<string | undefined>(
  Reflect.getPrototypeOf(Uint8Array.prototype) ?? Uint8Array.prototype,
  Symbol.toStringTag,
);

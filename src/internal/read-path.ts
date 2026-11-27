export function readPath(value: unknown, path: readonly PropertyKey[]): unknown {
  if (path.length === 0) return void 0;

  for (const key of path) {
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Property access boxes non-nullish primitives.
    value = (value as Record<PropertyKey, unknown> | null | undefined)?.[key];
  }

  return value;
}

export type ReadResultT<Value, Fallback> = NonNullable<Value> | (null extends Value
  ? Fallback
  : undefined extends Value ? Fallback : never);

export type FallbackArgsT<Fallback> = [fallback: Fallback] | (undefined extends Fallback ? [] : never);

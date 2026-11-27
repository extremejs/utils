export function elementBy<Value>(
  values: readonly Value[],
  iteratee: (value: Value) => number | undefined,
  isBetter: (score: number, bestScore: number) => boolean,
): Value | undefined {
  let bestScore: number | undefined;

  return values.reduce<Value | undefined>((winner, value) => {
    const score = iteratee(value);

    if (score != null && !Number.isNaN(score) && (bestScore === void 0 || isBetter(score, bestScore))) {
      bestScore = score;

      return value;
    }

    return winner;
  }, void 0);
}

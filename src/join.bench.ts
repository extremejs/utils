import { join } from "@extremejs/utils";
import { join as lodashJoin } from "lodash";
import { describe, test } from "vitest";
import { benchmark } from "#test";

describe.each([32, 2048])("%i elements", (size) => {
  const values = Array.from({ length: size }, () => "x");
  const expected = `${ "x,".repeat(size - 1) }x`;

  test("join a string array with an explicit comma separator", async context => benchmark(context, expected, [
    {
      run: (): string => join(values, ","),
    },
    {
      name: "lodash",
      run : (): string => lodashJoin(values, ","),
    },
  ]));
});

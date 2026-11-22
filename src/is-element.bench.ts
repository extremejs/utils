import { isElement } from "@extremejs/utils";
import { isElement as lodashIsElement } from "lodash";
import { test } from "vitest";
import { benchmark } from "#test";

class ElementLike {

  public readonly nodeType = 1;

}

const value: unknown = new ElementLike();

test("recognize an element-like instance", async context => benchmark(context, true, [
  {
    run: (): boolean => isElement(value),
  },
  {
    name: "lodash",
    run : (): boolean => lodashIsElement(value),
  },
]));

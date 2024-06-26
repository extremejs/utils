import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { EOL } from "node:os";
import { resolve } from "node:path";
import { argv, cwd, env } from "node:process";
import { Command } from "commander";
import { camelCase, compact, first, kebabCase } from "@extremejs/utils";

const DIR = resolve(cwd());

const SRC_DIR = resolve(DIR, "src");
const TEST_DIR = resolve(DIR, "tests");

const SORTING_REGEX = /^export *.* from "\.\/(?<name>.+)\.js";$/;

(new Command)
  .description("Create a new method.")
  .argument("name", "method's name")
  .option("-d, --description [description]", "method description", "TODO")
  .option("-g, --group [group]", "method group", "Other")
  .option(
    "-s, --since [since]",
    "the version the method will be available from",
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    first(env.npm_package_version!.split("-")),
  )
  .helpOption()
  .action(async (
    name,
    { description, group, since }: OptionsI,
  ) => {
    const FILENAME = kebabCase(name);

    const SRC_FILENAME = `${ FILENAME }.ts`;
    const SRC_FILEPATH = resolve(SRC_DIR, SRC_FILENAME);

    if (existsSync(SRC_FILEPATH)) throw new Error(`Method already exists: "src/${ SRC_FILENAME }"`);

    const TEST_FILENAME = `${ FILENAME }.test.ts`;
    const TEST_FILEPATH = resolve(TEST_DIR, TEST_FILENAME);

    if (existsSync(TEST_FILEPATH)) throw new Error(`Method already exists: "tests/${ TEST_FILENAME }"`);

    const METHOD_NAME = camelCase(name);

    // -------------------------< Create test file >-------------------------

    await writeFile(
      TEST_FILEPATH,
      `import { ${ METHOD_NAME } } from "@extremejs/utils";

it.todo("${ METHOD_NAME }");
`,
      "utf8",
    );

    // -------------------------< Create source file >-------------------------

    await writeFile(
      SRC_FILEPATH,
      `/**
 * ${ description }.
 * @group ${ group }
 * @since ${ since }
 * @example
 * ${ METHOD_NAME }(); // => undefined
 */
export function ${ METHOD_NAME }(): void {
  // TODO: Implement.
}
`,
      "utf8",
    );

    // -------------------------< Update source index >-------------------------

    const INDEX_FILEPATH = resolve(SRC_DIR, "index.ts");

    let index = await readFile(INDEX_FILEPATH, "utf8");

    const INDEX_LINES = compact(index.split(EOL));

    const CONSTANTS = INDEX_LINES.shift();

    INDEX_LINES.push(`export * from "./${ FILENAME }.js";`);

    INDEX_LINES.sort((a, b) => (a.replace(SORTING_REGEX, "$1") > b.replace(SORTING_REGEX, "$1") ? 1 : -1));

    INDEX_LINES.push("");

    if (CONSTANTS) INDEX_LINES.unshift(CONSTANTS);

    index = INDEX_LINES.join(EOL);

    await writeFile(INDEX_FILEPATH, index, "utf8");
  })
  .parse(argv);

interface OptionsI {
  description: string;
  group: string;
  since: string;
}

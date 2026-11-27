# @extremejs/utils

Modern TypeScript utilities inspired by [lodash](https://lodash.com),
aiming to be high performance while having minimal size impact.

[![CI](https://github.com/extremejs/utils/actions/workflows/ci.yml/badge.svg)](https://github.com/extremejs/utils/actions/workflows/ci.yml)
[![CodeCov](https://codecov.io/gh/extremejs/utils/branch/main/graph/badge.svg?token=1TKSPJICKI)](https://codecov.io/gh/extremejs/utils)
[![Security](https://snyk.io/test/github/extremejs/utils/badge.svg)](https://snyk.io/test/github/extremejs/utils)
[![License](https://img.shields.io/github/license/extremejs/utils.svg)](https://github.com/extremejs/utils/blob/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/@extremejs/utils.svg)](https://www.npmjs.com/package/@extremejs/utils)
[![NPM Monthly Downloads](https://img.shields.io/npm/dm/@extremejs/utils.svg)](https://www.npmjs.com/package/@extremejs/utils)
[![NPM Total Downloads](https://img.shields.io/npm/dt/@extremejs/utils.svg)](https://www.npmjs.com/package/@extremejs/utils)
[![NPM Bundle Size (Minified + GZip)](https://img.shields.io/bundlephobia/minzip/@extremejs/utils.svg)](https://bundlephobia.com/package/@extremejs/utils)
[![NPM Bundle Size (Minified)](https://img.shields.io/bundlephobia/min/@extremejs/utils.svg)](https://bundlephobia.com/package/@extremejs/utils)
[![Built with TypeScript](https://img.shields.io/npm/types/prototyped.js.svg)](https://www.typescriptlang.org)
[![Tested With Vitest](https://img.shields.io/badge/tested_with-vitest-6E9F18.svg)](https://vitest.dev)
[![Open GitHub Issues](https://img.shields.io/github/issues-raw/extremejs/utils.svg)](https://github.com/extremejs/utils/issues)
[![Open GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/extremejs/utils)](https://github.com/extremejs/utils/pulls)
[![Github Stars](https://img.shields.io/github/stars/extremejs/utils.svg?style=social&label=Stars)](https://github.com/extremejs/utils)
[![Github Forks](https://img.shields.io/github/forks/extremejs/utils.svg?style=social&label=Fork)](https://github.com/extremejs/utils)

## Table of Content

- [Installation](#installation)
  - [Pnpm](#pnpm)
  - [Bun](#bun)
- [Usage](#usage)
  - [Notes](#notes)
- [Lodash compatibility](#lodash-compatibility)
- [Versioning](#versioning)
- [Authors](#authors)
- [License](#license)

## Installation

### Pnpm

```shell
pnpm add @extremejs/utils
```

### Bun

```shell
bun add @extremejs/utils
```

## Usage

This package provides ES modules only.

```typescript
import { sumByFn, sumByProperty, sumBy } from "@extremejs/utils";
// or
import { sumBy } from "@extremejs/utils/sum-by";
import { sumByFn } from "@extremejs/utils/sum-by-fn";
import { sumByProperty } from "@extremejs/utils/sum-by-property";

const sum1 = sumByFn([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a); // => 6
// or
const sum2 = sumBy([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a); // => 6
// or
const sum3 = sumByProperty([{ a: 1 }, { a: 2 }, { a: 3 }], "a"); // => 6
// or
const sum4 = sumBy([{ a: 1 }, { a: 2 }, { a: 3 }], "a"); // => 6
```

Numeric aggregates require a callback that returns a number or a typed path to a numeric property.
Use a segment array for literal keys with dots or brackets. To retrieve the original record with
the greatest or least score, use `maxElementBy` or `minElementBy`.

```typescript
import { maxElementBy, minElementBy } from "@extremejs/utils";

const teams = [{ name: "A", stats: { score: 3 } }, { name: "B", stats: { score: 1 } }];
maxElementBy(teams, ["stats", "score"]); // => teams[0]
minElementBy(teams, team => team.stats.score); // => teams[1]
```

> API usage documents are available [here](https://extremejs.github.io/utils).

### Notes

1. Although this package is inspired by `lodash`,
   the method names might not be exactly the same or have different usage API,
   so make sure to read the docs first before using it.
2. The methods do not type check at runtime
   (e.g. The `Array` `chunk` method assumes the `size` parameter is always a valid positive integer)
   so make sure you pass the correct values based on the `documents`/`typescript` types.

## Lodash compatibility

The [compatibility inventory](https://github.com/extremejs/utils/blob/main/LODASH_COMPATIBILITY.md) maps Lodash calls to ExtremeJS, documents behavior differences, and lists the benchmark commands.

## Versioning

We use [SemVer](http://semver.org) for versioning.
For the versions available, see the [releases on this repository](https://github.com/extremejs/utils/releases).

## Authors

- **Ardalan Amini** - _Core Maintainer_ - [@ardalanamini](https://github.com/ardalanamini)

See also the list of [contributors](https://github.com/extremejs/utils/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/extremejs/utils/blob/main/LICENSE) file for details.

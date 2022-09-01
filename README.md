# @extremejs/utils

Modern TypeScript utilities inspired by [lodash](https://lodash.com),
aiming to be high performance while having minimal size impact.

[![Test](https://github.com/extremejs/utils/actions/workflows/test.yml/badge.svg)](https://github.com/extremejs/utils/actions/workflows/test.yml)
[![CodeCov](https://codecov.io/gh/extremejs/utils/branch/main/graph/badge.svg?token=1TKSPJICKI)](https://codecov.io/gh/extremejs/utils)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/extremejs/utils)](https://snyk.io/test/github/extremejs/utils)
[![License](https://img.shields.io/github/license/extremejs/utils.svg)](https://github.com/extremejs/utils/blob/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/@extremejs/utils.svg)](https://www.npmjs.com/package/@extremejs/utils)
[![NPM Monthly Downloads](https://img.shields.io/npm/dm/@extremejs/utils.svg)](https://www.npmjs.com/package/@extremejs/utils)
[![NPM Total Downloads](https://img.shields.io/npm/dt/@extremejs/utils.svg)](https://www.npmjs.com/package/@extremejs/utils)
[![NPM Bundle Size (Minified + GZip)](https://img.shields.io/bundlephobia/minzip/@extremejs/utils.svg)](https://bundlephobia.com/package/@extremejs/utils)
[![NPM Bundle Size (Minified)](https://img.shields.io/bundlephobia/min/@extremejs/utils.svg)](https://bundlephobia.com/package/@extremejs/utils)
[![Built with TypeScript](https://img.shields.io/npm/types/prototyped.js.svg)](https://www.typescriptlang.org)
[![Tested With Jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://jestjs.io)
[![Open GitHub Issues](https://img.shields.io/github/issues-raw/extremejs/utils.svg)](https://github.com/extremejs/utils/issues)
[![Open GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/extremejs/utils)](https://github.com/extremejs/utils/pulls)
[![Github Stars](https://img.shields.io/github/stars/extremejs/utils.svg?style=social&label=Stars)](https://github.com/extremejs/utils)
[![Github Forks](https://img.shields.io/github/forks/extremejs/utils.svg?style=social&label=Fork)](https://github.com/extremejs/utils)

## Table of Content

- [Installation](#installation)
  - [NPM & GitHub Packages](#npm--github-packages)
  - [Yarn](#yarn)
- [Usage](#usage)
- [Versioning](#versioning)
- [Authors](#authors)
- [License](#license)

## Installation

### NPM & GitHub Packages

```shell
npm i @extremejs/utils
```

### Yarn

```shell
yarn add @extremejs/utils
```

## Usage

```typescript
import { sumByFn } from "@extremejs/utils";

const sum = sumByFn([{ a: 1 }, { a: 2 }, { a: 3 }], ({ a }) => a);
```

> API usage documents are available [here](https://extremejs.github.io/utils).

## Versioning

We use [SemVer](http://semver.org) for versioning.
For the versions available, see the [releases on this repository](https://github.com/extremejs/utils/releases).

## Authors

- **Ardalan Amini** - _Core Maintainer_ - [@ardalanamini](https://github.com/ardalanamini)

See also the list of [contributors](https://github.com/extremejs/utils/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/extremejs/utils/blob/main/LICENSE) file for details.

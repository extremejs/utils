function toStrictArguments(...args: unknown[]): IArguments;
function toStrictArguments(): IArguments {
  // oxlint-disable-next-line unicorn/prefer-module
  "use strict";

  // oxlint-disable-next-line prefer-rest-params
  return arguments;
}

export default toStrictArguments;

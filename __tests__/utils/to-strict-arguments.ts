function toStrictArguments(...args: unknown[]): IArguments;
function toStrictArguments(): IArguments {
  // eslint-disable-next-line strict
  "use strict";

  // eslint-disable-next-line prefer-rest-params
  return arguments;
}

export default toStrictArguments;

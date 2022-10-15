function toArguments(...args: unknown[]): IArguments;
function toArguments(): IArguments {
  // eslint-disable-next-line prefer-rest-params
  return arguments;
}

export default toArguments;

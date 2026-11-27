import { builtinGetter, nodeTypes, tryReadBuiltin } from "./builtin-brand.js";

const getMapSize = builtinGetter<number>(Map.prototype, "size");
const getSetSize = builtinGetter<number>(Set.prototype, "size");

export function mapSize(value: unknown): number | undefined {
  return nodeTypes?.isMap(value) === false ? void 0 : tryReadBuiltin(getMapSize, value);
}

export function setSize(value: unknown): number | undefined {
  return nodeTypes?.isSet(value) === false ? void 0 : tryReadBuiltin(getSetSize, value);
}

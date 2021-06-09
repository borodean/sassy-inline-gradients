import sass from "sass";

import {
  assertNumber,
  assertPositive,
  assertUnit,
} from "../helpers/assertions";

export default function parseSize(
  size: sass.types.SassType,
  name: string
): number {
  assertNumber(size, name);
  assertPositive(size, name);
  assertUnit(size, "px", name);

  return size.getValue();
}

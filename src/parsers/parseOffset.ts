import sass from "sass";

import { AssertionError, assertNumber } from "helpers/assertions";

export default function parseOffset(
  offset: sass.types.SassType,
  gradientSize: number,
  name: string
): number {
  assertNumber(offset, name);

  const unit = offset.getUnit();
  const value = offset.getValue();

  if (unit === "%") {
    return value / 100;
  }

  if (unit === "px") {
    return value / gradientSize;
  }

  if (!unit && !value) {
    return 0;
  }

  throw new AssertionError(
    `Expected ${offset} to have unit "%" or "px".`,
    name
  );
}

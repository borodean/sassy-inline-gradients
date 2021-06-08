import sass from "sass";

export class AssertionError extends Error {
  constructor(message: string, name: string) {
    super(`${name}: ${message}`);
  }
}

export function assertColor(
  value: sass.types.SassType,
  name: string
): asserts value is sass.types.Color {
  if (value instanceof sass.types.Color) {
    return;
  }

  throw new AssertionError(`${value} is not a color.`, name);
}

export function assertList(
  value: sass.types.SassType,
  name: string
): asserts value is sass.types.List {
  if (value instanceof sass.types.List) {
    return;
  }

  throw new AssertionError(`${value} is not a list.`, name);
}

export function assertMinLength(
  value: sass.types.List,
  minLength: number,
  name: string
): void {
  if (value.getLength() >= minLength) {
    return;
  }

  throw new AssertionError(`Expected to have at least 2 elements.`, name);
}

export function assertNumber(
  value: sass.types.SassType,
  name: string
): asserts value is sass.types.Number {
  if (value instanceof sass.types.Number) {
    return;
  }

  throw new AssertionError(`${value} is not a number.`, name);
}

export function assertPositive(number: sass.types.Number, name: string): void {
  if (number.getValue() > 0) {
    return;
  }

  throw new AssertionError(`Expected ${number} to be positive.`, name);
}

export function assertUnit(
  number: sass.types.Number,
  unit: string,
  name: string
): void {
  if (number.getUnit() === unit) {
    return;
  }

  throw new AssertionError(`Expected ${number} to have unit "${unit}".`, name);
}

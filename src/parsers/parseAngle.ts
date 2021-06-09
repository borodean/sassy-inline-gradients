import sass from "sass";

import { AssertionError } from "../helpers/assertions";
import {
  convertDegreesToRadians,
  convertGradiansToRadians,
  convertTurnsToRadians,
} from "../helpers/converters";

export default function parseAngle(
  angle: sass.types.SassType,
  name: string
): number {
  if (angle instanceof sass.types.Number) {
    const unit = angle.getUnit();
    const value = angle.getValue();

    if (unit === "deg") {
      return convertDegreesToRadians(value);
    }

    if (unit === "grad") {
      return convertGradiansToRadians(value);
    }

    if (unit === "rad") {
      return value;
    }

    if (unit === "turn") {
      return convertTurnsToRadians(value);
    }

    if (!unit && !value) {
      return 0;
    }

    throw new AssertionError(
      `Expected ${angle} to have an angle unit (deg, grad, rad, turn).`,
      name
    );
  }

  const value = keywordsToRadians[angle.toString()];

  if (value !== undefined) {
    return value;
  }

  throw new AssertionError(
    `${angle} is neither a number, nor a keyword (to top, to left, etc.).`,
    name
  );
}

const keywordsToRadians: Record<string, number | undefined> = {
  "to bottom": convertDegreesToRadians(180),
  "to bottom left": convertDegreesToRadians(225),
  "to bottom right": convertDegreesToRadians(135),
  "to left": convertDegreesToRadians(270),
  "to left bottom": convertDegreesToRadians(225),
  "to left top": convertDegreesToRadians(315),
  "to right": convertDegreesToRadians(90),
  "to right bottom": convertDegreesToRadians(135),
  "to right top": convertDegreesToRadians(45),
  "to top": convertDegreesToRadians(0),
  "to top left": convertDegreesToRadians(315),
  "to top right": convertDegreesToRadians(45),
};

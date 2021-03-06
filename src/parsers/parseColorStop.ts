import sass from "sass";

import { assertColor, AssertionError } from "../helpers/assertions";
import { premultiply } from "../helpers/color-stops";
import { RawColorStop } from "../helpers/types";
import parseOffset from "./parseOffset";

export default function parseColorStop(
  stop: sass.types.SassType,
  gradientSize: number,
  name: string
): RawColorStop {
  if (stop instanceof sass.types.Color) {
    return {
      premultiplied: premultiply(stop).toString(),
    };
  }

  if (stop instanceof sass.types.List && stop.getLength() === 2) {
    assertColor(stop.getValue(0), name);

    return {
      offset: parseOffset(stop.getValue(1), gradientSize, name),
      premultiplied: premultiply(stop.getValue(0)).toString(),
    };
  }

  throw new AssertionError(
    `${stop} is neither a color, nor a pair of a color and a number.`,
    name
  );
}

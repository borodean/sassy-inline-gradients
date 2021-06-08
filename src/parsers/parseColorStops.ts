import sass from "sass";

import { assertList, assertMinLength } from "helpers/assertions";
import { fixMissingOffsets, fixOverlaps, mapList } from "helpers/color-stops";
import { ColorStop } from "helpers/types";
import parseColorStop from "parsers/parseColorStop";

export default function parseColorStops(
  stops: sass.types.SassType,
  gradientSize: number,
  name: string
): ColorStop[] {
  assertList(stops, name);
  assertMinLength(stops, 2, name);

  const rawStops = mapList(stops, (element) =>
    parseColorStop(element, gradientSize, name)
  );

  if (rawStops[0].offset === undefined) {
    rawStops[0].offset = 0;
  }

  if (rawStops[rawStops.length - 1].offset === undefined) {
    rawStops[rawStops.length - 1].offset = 1;
  }

  return fixMissingOffsets(fixOverlaps(rawStops));
}

import sass from "sass";

import { ColorStop, RawColorStop } from "./types";

export function fixOverlaps(stops: RawColorStop[]): RawColorStop[] {
  let largestOffset = 0;

  return stops.map((stop) => {
    if (stop.offset === undefined) {
      return stop;
    }

    if (stop.offset > largestOffset) {
      largestOffset = stop.offset;
      return stop;
    }

    return {
      ...stop,
      offset: largestOffset,
    };
  });
}

export function fixMissingOffsets(stops: RawColorStop[]): ColorStop[] {
  let prevOffset = 0;

  const sequence: RawColorStop[] = [];
  const result: ColorStop[] = [];

  stops.forEach(({ color, offset }) => {
    if (offset === undefined) {
      sequence.push({ color, offset });
    } else {
      result.push(
        ...sequence.map((foo, index) => ({
          color: foo.color,
          offset:
            prevOffset +
            ((index + 1) * (offset - prevOffset)) / (sequence.length + 1),
        })),
        { color, offset }
      );

      sequence.length = 0;
      prevOffset = offset;
    }
  });

  return result;
}

export function mapList<T extends sass.types.SassType, U>(
  list: sass.types.List<T>,
  callback: (element: T) => U
): U[] {
  const result = [];

  let index = 0;
  let element = list.getValue(index);

  while (element) {
    result.push(callback(element));
    index += 1;
    element = list.getValue(index);
  }

  return result;
}

import { Canvas, createCanvas } from "canvas";
import sass from "sass";

import parseAngle from "parsers/parseAngle";
import parseColorStops from "parsers/parseColorStops";
import parseSize from "parsers/parseSize";

type Options = {
  resolver?: (canvas: Canvas) => string;
};

export default function createFunctions({
  resolver = defaultResolver,
}: Options = {}): sass.Options["functions"] {
  return {
    "inline-linear-gradient($size, $angle, $color-stops...)": (
      size,
      angle,
      colorStops
    ) => {
      const parsedSize = parseSize(size, "$size");
      const parsedAngle = parseAngle(angle, "$angle");
      const parsedStops = parseColorStops(
        colorStops,
        parsedSize,
        "$color-stops"
      );

      const width = Math.round(parsedSize * Math.sin(parsedAngle));
      const height = Math.round(parsedSize * Math.cos(parsedAngle));

      const canvas = createCanvas(
        Math.max(Math.abs(width), 1),
        Math.max(Math.abs(height), 1)
      );

      const ctx = canvas.getContext("2d");

      const gradient = ctx.createLinearGradient(
        width > 0 ? 0 : -width,
        height > 0 ? height : 0,
        width > 0 ? width : 0,
        height > 0 ? 0 : -height
      );

      parsedStops.forEach((stop) => {
        gradient.addColorStop(stop.offset, stop.color);
      });

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      canvas.toBuffer().toString();

      return new sass.types.String(`url(${resolver(canvas)})`);
    },
  };
}

const defaultResolver = (canvas: Canvas): string =>
  canvas.toDataURL("image/png");

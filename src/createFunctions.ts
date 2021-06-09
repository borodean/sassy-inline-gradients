import { createCanvas } from "canvas";
import imagemin from "imagemin";
import imageminOptipng from "imagemin-optipng";
import sass from "sass";

import { AssertionError } from "./helpers/assertions";
import { Options } from "./helpers/types";
import parseAngle from "./parsers/parseAngle";
import parseColorStops from "./parsers/parseColorStops";
import parseSize from "./parsers/parseSize";

export default function createFunctions({
  optimize = false,
  resolver = defaultResolver,
}: Options = {}): sass.Options["functions"] {
  return {
    "inline-linear-gradient($size, $angle, $color-stops...)": (
      size,
      angle,
      colorStops,
      done
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

      const result = canvas.toBuffer("image/png");

      if (!optimize) {
        return wrapResult(resolver(result));
      }

      if (typeof done !== "function") {
        throw new AssertionError(
          "Cannot be enabled when rendering synchronously.",
          "options.optimize"
        );
      }

      imagemin
        .buffer(result, {
          plugins: [imageminOptipng({ optimizationLevel: 7 })],
        })
        .then((optimized) => done(wrapResult(resolver(optimized))));
    },
  };
}

function defaultResolver(result: Buffer): string {
  return `data:image/png;base64,${result.toString("base64")}`;
}

function wrapResult(result: string) {
  return new sass.types.String(`url(${result})`);
}

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

      const xa = Math.round(parsedSize * Math.sin(parsedAngle));
      const ya = Math.round(parsedSize * Math.cos(parsedAngle));

      const width = Math.max(Math.abs(xa), 1);
      const height = Math.max(Math.abs(ya), 1);

      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext("2d");

      const gradient = ctx.createLinearGradient(
        xa > 0 ? 0 : -xa,
        ya > 0 ? ya : 0,
        xa > 0 ? xa : 0,
        ya > 0 ? 0 : -ya
      );

      parsedStops.forEach((stop) => {
        gradient.addColorStop(stop.offset, stop.premultiplied);
      });

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height);
      unpremultiply(imageData);
      ctx.putImageData(imageData, 0, 0);

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

function unpremultiply(imageData: ImageData): void {
  for (let i = 0; i < imageData.data.length; i += 4) {
    const factor = imageData.data[i + 3] / 255;

    if (factor !== 0) {
      /* eslint-disable no-param-reassign */
      imageData.data[i] /= factor;
      imageData.data[i + 1] /= factor;
      imageData.data[i + 2] /= factor;
    }
  }
}

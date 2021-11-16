import imagemin from "imagemin";
import imageminOptipng from "imagemin-optipng";
import puppeteer from "puppeteer";
import sass from "sass";

import { AssertionError } from "./helpers/assertions";
import { Options } from "./helpers/types";
import parseAngle from "./parsers/parseAngle";
import parseSize from "./parsers/parseSize";

async function whatever(width: number, height: number, bg: string) {
  const page = await getPage();
  await page.evaluate(
    (width: number, height: number, bg: string) => {
      const div = document.createElement("div");
      div.id = "sample";
      div.style.width = `${width}px`;
      div.style.height = `${height}px`;
      div.style.background = bg;
      document.body.appendChild(div);
      return div;
    },
    width,
    height,
    bg
  );
  const element = await page.$("#sample");
  const result = await element?.screenshot();
  await page.reload();

  if (!(result instanceof Buffer)) {
    throw new Error();
  }

  return result;
}

process.on("beforeExit", () => {
  console.log("exit");
});

let pageInstance: puppeteer.Page | undefined;

async function getPage(): Promise<puppeteer.Page> {
  if (pageInstance) {
    return pageInstance;
  }

  const browser = await puppeteer.launch();
  return await browser.newPage();
}

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

      const xa = Math.round(parsedSize * Math.sin(parsedAngle));
      const ya = Math.round(parsedSize * Math.cos(parsedAngle));

      const width = Math.max(Math.abs(xa), 1);
      const height = Math.max(Math.abs(ya), 1);

      // if (!optimize) {
      //   return wrapResult(resolver(result));
      // }

      if (typeof done !== "function") {
        throw new AssertionError(
          "Cannot be enabled when rendering synchronously.",
          "options.optimize"
        );
      }

      whatever(width, height, `linear-gradient(${angle}, ${colorStops})`)
        .then((result) => {
          if (optimize) {
            return imagemin.buffer(result, {
              plugins: [imageminOptipng({ optimizationLevel: 7 })],
            });
          }

          return result;
        })
        .then((optimized) => {
          done(wrapResult(resolver(optimized)));
        });
    },
  };
}

function defaultResolver(result: Buffer): string {
  return `data:image/png;base64,${result.toString("base64")}`;
}

function wrapResult(result: string) {
  return new sass.types.String(`url(${result})`);
}

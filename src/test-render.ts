import sass from "sass";

import createFunctions from "./createFunctions";
import { Options } from "./helpers/types";

export function render(input: string, options: Options = {}): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    sass.render(getOptions(input, options), (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(extractImage(result.css));
      }
    });
  });
}

export function renderSync(input: string, options: Options = {}): Buffer {
  const result = sass.renderSync(getOptions(input, options));
  return extractImage(result.css);
}

function getOptions(input: string, options: Options): sass.Options {
  return {
    data: `body { background: ${input} }`,
    functions: {
      ...createFunctions(options),
    },
  };
}

function extractImage(css: Buffer): Buffer {
  const matches = css
    .toString()
    .match(/background: url\(data:image\/png;base64,(.+)\)/);

  if (!matches) {
    throw new Error("No matches.");
  }

  return Buffer.from(matches[1], "base64");
}

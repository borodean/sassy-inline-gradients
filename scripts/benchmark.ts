/* eslint-disable no-console */

import sass from "sass";

import createFunctions from "../src/createFunctions";
import samples from "../src/test-samples";

let totalSize = 0;

console.log("Processing...");

samples.forEach((sample) => {
  sass.renderSync({
    data: `
      .body {
        background-image: inline-linear-gradient(50px, ${sample});
      }
    `,
    functions: createFunctions({
      resolver: (canvas) => {
        totalSize += canvas.toBuffer().length;
        return "none";
      },
    }),
  });
});

console.log("Total size of all images: %i bytes", totalSize);

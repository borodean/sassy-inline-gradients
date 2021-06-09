/* eslint-disable no-console */

import sass from "sass";

import createFunctions from "../src/createFunctions";
import samples from "../src/test-samples";

let totalSize = 0;

console.log("Processing...");

// (async () => {})

Promise.all(
  samples.map(
    (sample) =>
      new Promise<void>((resolve, reject) => {
        sass.render(
          {
            data: `
            .body {
              background-image: inline-linear-gradient(50px, ${sample});
            }
          `,
            functions: createFunctions({
              optimize: true,
              resolver: (result) => {
                totalSize += result.length;
                return "none";
              },
            }),
          },
          (err) => (err ? reject() : resolve())
        );
      })
  )
).then(() => console.log("Total size of all images: %i bytes", totalSize));

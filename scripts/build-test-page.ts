import fs from "fs";
import sass from "sass";

import createFunctions from "../src/createFunctions";
import samples from "../src/test-samples";

const output: string[] = [];

output.push(`
  <style>
    html {
      cursor: pointer;
    }

    html:active .sample-native {
      mix-blend-mode: difference;
      transform: translate(-100%, 0)
    }

    body {
      align-content: flex-start;
      display: flex;
      flex-wrap: wrap;
    }

    .container {
      margin: 0 5px 5px 0;
      width: 100px;
    }

    .samples {
      display: flex;
    }

    .sample {
      background-color: white;
      background-size: 100% 100%;
      height: 50px;
      width: 50px;
    }

    .label {
      font: 10px/1 monospace;
    }
  </style>
`);

Promise.all(
  samples.map(
    (sample, index) =>
      new Promise<void>((resolve, reject) => {
        sass.render(
          {
            data: `
              .sample-${index}-inline {
                background-image: inline-linear-gradient(50px, ${sample});
              }

              .sample-${index}-native {
                background-image: linear-gradient(${sample});
              }
          `,
            functions: createFunctions(),
          },
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              output.push(`
                <style>${result.css.toString()}</style>
                <div class="container">
                  <div class="samples">
                    <div class="sample sample-inline sample-${index}-inline"></div>
                    <div class="sample sample-native sample-${index}-native"></div>
                  </div>
                  <div class="label">${sample}</div>
                </div>
              `);
              resolve();
            }
          }
        );
      })
  )
).then(() => fs.writeFileSync("test-page.html", output.join("\n")));

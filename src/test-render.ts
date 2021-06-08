import sass from "sass";

import createFunctions from "./createFunctions";

export default function render(input: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    sass.render(
      {
        data: `body { background: ${input} }`,
        functions: {
          ...createFunctions(),
        },
      },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          const matches = result.css
            .toString()
            .match(/background: url\(data:image\/png;base64,(.+)\)/);

          if (matches) {
            resolve(Buffer.from(matches[1], "base64"));
          } else {
            reject();
          }
        }
      }
    );
  });
}

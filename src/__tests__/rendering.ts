import { render, renderSync } from "../test-render";
import samples from "../test-samples";

const inputs = samples.map(
  (sample) => `inline-linear-gradient(50px, ${sample})`
);

test.each(inputs)("%s", async (input) => {
  await expect(render(input)).resolves.toMatchImageSnapshot({
    customSnapshotIdentifier: ({ currentTestName }) =>
      Buffer.from(currentTestName).toString("base64"),
  });
});

test("runs in synchronous mode", () => {
  expect(() =>
    renderSync("inline-linear-gradient(50px, to bottom, red, blue)")
  ).not.toThrow();
});

test("does not optimize in synchronous mode", () => {
  expect(() =>
    renderSync("inline-linear-gradient(50px, to bottom, red, blue)", {
      optimize: true,
    })
  ).toThrow(
    "options.optimize: Cannot be enabled when rendering synchronously."
  );
});

test("optimizes in asynchronous mode", async () => {
  await expect(
    render("inline-linear-gradient(50px, to bottom, red, blue)", {
      optimize: true,
    })
  ).resolves.not.toThrow();
});

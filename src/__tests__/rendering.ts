import { render } from "../test-render";
import samples from "../test-samples";

const inputs = samples
  .slice(0, 1)
  .map((sample) => `inline-linear-gradient(50px, ${sample})`);

test.only.each(inputs)("%s", async (input) => {
  await expect(render(input)).resolves.toMatchImageSnapshot({
    customSnapshotIdentifier: ({ currentTestName }) =>
      Buffer.from(currentTestName).toString("base64"),
  });
});

test("runs in asynchronous mode", async () => {
  await expect(
    render("inline-linear-gradient(50px, to bottom, red, blue)", {
      optimize: false,
    })
  ).resolves.not.toThrow();
});

test("optimizes in asynchronous mode", async () => {
  await expect(
    render("inline-linear-gradient(50px, to bottom, red, blue)", {
      optimize: true,
    })
  ).resolves.not.toThrow();
});

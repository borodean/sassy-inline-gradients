import render from "../test-render";
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

import render from "../test-render";

test("$size validation", async () => {
  await expect(render("inline-linear-gradient()")).rejects.toThrow(
    "Missing argument $size."
  );

  await expect(
    render("inline-linear-gradient(pink, to top, red, blue)")
  ).rejects.toThrow("$size: pink is not a number.");

  await expect(
    render("inline-linear-gradient(-50px, to top, red, blue)")
  ).rejects.toThrow("$size: Expected -50px to be positive.");

  await expect(
    render("inline-linear-gradient(0, to top, red, blue)")
  ).rejects.toThrow("$size: Expected 0 to be positive.");

  await expect(
    render("inline-linear-gradient(50em, to top, red, blue)")
  ).rejects.toThrow('$size: Expected 50em to have unit "px".');
});

test("$angle validation", async () => {
  await expect(render("inline-linear-gradient(50px)")).rejects.toThrow(
    "Missing argument $angle."
  );

  await expect(
    render("inline-linear-gradient(50px, pink, red, blue)")
  ).rejects.toThrow(
    "$angle: pink is neither a number, nor a keyword (to top, to left, etc.)."
  );

  await expect(
    render("inline-linear-gradient(50px, 90em, red, blue)")
  ).rejects.toThrow(
    "$angle: Expected 90em to have an angle unit (deg, grad, rad, turn)."
  );
});

test("$color-stops validation", async () => {
  await expect(render("inline-linear-gradient(50px, 90deg)")).rejects.toThrow(
    "$color-stops: Expected to have at least 2 elements."
  );

  await expect(
    render("inline-linear-gradient(50px, 90deg, red)")
  ).rejects.toThrow("$color-stops: Expected to have at least 2 elements.");

  await expect(
    render("inline-linear-gradient(50px, 90deg, red, 2px)")
  ).rejects.toThrow(
    "$color-stops: 2px is neither a color, nor a pair of a color and a number."
  );

  await expect(
    render("inline-linear-gradient(50px, 90deg, red, 2px 2px)")
  ).rejects.toThrow("$color-stops: 2px is not a color.");

  await expect(
    render("inline-linear-gradient(50px, 90deg, red, blue pink)")
  ).rejects.toThrow("$color-stops: pink is not a number.");

  await expect(
    render("inline-linear-gradient(50px, 90deg, red, blue 2em)")
  ).rejects.toThrow('$color-stops: Expected 2em to have unit "%" or "px".');

  await expect(
    render("inline-linear-gradient(50px, 90deg, red, blue 2% 5%)")
  ).rejects.toThrow(
    "$color-stops: blue 2% 5% is neither a color, nor a pair of a color and a number."
  );
});

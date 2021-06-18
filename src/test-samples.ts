/* eslint-disable import/no-extraneous-dependencies */

import { range, round } from "lodash";

const keywords = [
  "to bottom left",
  "to bottom right",
  "to bottom",
  "to left bottom",
  "to left top",
  "to left",
  "to right bottom",
  "to right top",
  "to right",
  "to top left",
  "to top right",
  "to top",
];

function populateAngles(turn: number, unit: string): string[] {
  const step = turn / 12;
  return range(-turn, turn + step, step).map((value) => round(value, 4) + unit);
}

const angles = [
  ...keywords,
  ...populateAngles(360, "deg"),
  ...populateAngles(400, "grad"),
  ...populateAngles(2 * Math.PI, "rad"),
  ...populateAngles(1, "turn"),
  0,
];

const samples = [
  /* Test various angles: */
  ...angles.map((angle) => `${angle}, red, blue`),

  /* Test various number of color stops: */
  "90deg, red, green, blue",
  "90deg, red, green, blue, black",
  "90deg, red, yellow, green, cyan, blue",

  /* Test percentages: */
  "90deg, red 30%, green 75%, blue 80%",

  /* Test pixels: */
  "90deg, red 10px, green 35px, blue 40px",

  /* Test mixed units: */
  "90deg, red 0, green 20px, blue 60%, black",

  /* Test overlapping color stop offsets: */
  "90deg, red, yellow -200%, green 30%, cyan 20%, blue",

  /* Test non-default trailing color stop offsets: */
  "90deg, red 30%, green, blue 70%",

  /* Transparent (pre-multiplication test) */
  "90deg, red, transparent, blue",
  "90deg, red, rgba(0, 255, 0, 0), blue",
  "90deg, red, rgba(0, 255, 0, 0.1), blue",
];

export default samples;

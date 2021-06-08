export function convertDegreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function convertGradiansToRadians(gradians: number): number {
  return gradians * (Math.PI / 200);
}

export function convertTurnsToRadians(turns: number): number {
  return turns * (2 * Math.PI);
}

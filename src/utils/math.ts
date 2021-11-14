export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.round(Math.random() * (max - min + 1)) + min;
}

export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

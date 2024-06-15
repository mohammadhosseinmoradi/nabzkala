/**
 * Generate random number between min and max range.
 * The max is inclusive and the min is inclusive.
 *
 * @param min number
 * @param max number
 */
export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

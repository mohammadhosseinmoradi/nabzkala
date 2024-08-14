/**
 * Generates an array of numbers within the specified range.
 * @param {number} from The starting number of the range (inclusive).
 * @param {number} to The ending number of the range (exclusive).
 * @returns {number[]} An array of numbers within the specified range.
 */
export function range(from: number, to: number): number[] {
  const numbers: number[] = [];
  for (let i = from; i < to; i++) {
    numbers.push(i);
  }
  return numbers;
}

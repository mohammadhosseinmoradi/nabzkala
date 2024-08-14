/**
 * Calculates the percentage of a value relative to a total.
 * @param {number} value - The value to calculate the percentage of.
 * @param {number} total - The total value against which to calculate the percentage.
 * @returns {number} The calculated percentage.
 * @throws {Error} If either value or total is not a number, or if total is zero.
 */
export function getPercentage(value: number, total: number): number {
  return (value / total) * 100;
}

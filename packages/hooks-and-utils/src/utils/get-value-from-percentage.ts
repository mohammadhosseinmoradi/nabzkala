/**
 * Calculates the value from a given percentage of a total.
 * @param {number} percentage - The percentage value.
 * @param {number} total - The total value.
 * @returns {number} The calculated value.
 */
export function getValueFromPercentage(
  percentage: number,
  total: number,
): number {
  return (percentage / 100) * total;
}

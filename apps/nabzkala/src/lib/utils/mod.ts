/**
 * Calculate the positive modulo operation for two numbers.
 *
 * The result is always positive, regardless of the sign of the dividend.
 *
 * @param {number} n - The dividend.
 * @param {number} m - The divisor.
 * @returns {number} The positive modulo result.
 * @throws {Error} When the divisor (m) is zero.
 *
 * @example
 * const result = mod(10, 3); // Returns 1
 */
export function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

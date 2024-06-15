/**
 * Converts a given size in bytes to the nearest unit (B, KB, MB, GB, etc.).
 *
 * @param {number} bytes - The size in bytes to be converted.
 * @returns {[number, string]} - A tuple containing the converted size without floating-point numbers and the corresponding unit.
 */
export function convertBytesToNearestUnit(bytes: number): [number, string] {
  /**
   * Units for size representation.
   * @type {string[]}
   */
  const units: string[] = [
    "بایت",
    "کیلوبایت",
    "مگابایت",
    "گیگابایت",
    "ترابایت",
  ];

  /**
   * Index of the current unit.
   * @type {number}
   */
  let unitIndex: number = 0;

  while (bytes >= 1024 && unitIndex < units.length - 1) {
    bytes /= 1024;
    unitIndex++;
  }

  /**
   * Tuple containing the converted size without floating-point numbers and the corresponding unit.
   * @type {[number, string]}
   */
  return [Math.floor(bytes), units[unitIndex]];
}

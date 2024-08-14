/**
 * Formats a number with a thousand separator (comma).
 * @param number - The number to format.
 * @returns {string} - The formatted number as a string.
 */
export default function thousandSeparator(number: number | string): string {
  let parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

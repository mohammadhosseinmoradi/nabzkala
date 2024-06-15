import { mod } from "@/lib/utils/mod";

const dayNames = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
  "شنبه",
];

export function getDayNames(config?: {
  /**
   * Start from 0 to 6, sunday (0) to saturday (6)
   */
  startOfWeek: number;
}) {
  const startOfWeek = config?.startOfWeek || 0;

  return dayNames.map((item, i) => {
    const index = mod(startOfWeek + i, 7);
    return dayNames[index];
  });
}

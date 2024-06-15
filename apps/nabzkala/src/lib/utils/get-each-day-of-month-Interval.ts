import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  startOfMonth,
} from "date-fns-jalali";
import { mod } from "@/lib/utils/mod";

/**
 * Get each day in month with offset in start week and end week.
 * @param date
 * @param config
 */
export function getEachDayOfMonthInterval(
  /**
   * Current month
   */
  date: Date,
  config?: {
    /**
     * Start from 0 to 6, sunday (0) to saturday (6)
     */
    startOfWeek: number;
  },
) {
  const startOfWeek = config?.startOfWeek || 0;

  // start of current month
  const startOfCurrentMonth = startOfMonth(date);

  // end of current month
  const endOfCurrentMonth = endOfMonth(date);

  // 0 to 6
  const endOfWeek = mod(startOfWeek - 1, 7);

  return eachDayOfInterval({
    start: addDays(
      startOfCurrentMonth,
      // Add offset days
      -mod(startOfCurrentMonth.getDay() - startOfWeek, 7),
    ),
    end: addDays(
      endOfCurrentMonth,
      // Add offset days
      mod(endOfWeek - endOfCurrentMonth.getDay(), 7),
    ),
  });
}

import { parse } from "date-fns";
import { DEFAULT_DATE_FORMAT } from "@/components/date-time-picker/components/date-time-picker";

export function getDateObj(
  value?: string | null,
  format: string = DEFAULT_DATE_FORMAT,
) {
  const dateStr = value;
  if (!dateStr) return new Date();
  return parse(dateStr, format, new Date());
}

export function getRange(from: number, to: number) {
  const numbers: number[] = [];
  for (let i = from; i < to; i++) {
    numbers.push(i);
  }
  return numbers;
}

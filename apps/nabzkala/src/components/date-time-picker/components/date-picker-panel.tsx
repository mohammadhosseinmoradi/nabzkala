import { cn } from "@/lib/utils";
import { Dialog } from "@/components/dialog";
import { ClockIcon } from "lucide-react";
import { RangeSlider } from "./range-slider";
import { Picker, useDateTimePickerContext } from "../context";
import { Button } from "@/components/button";
import { getRange } from "@/components/date-time-picker/utils";
import {
  getDate,
  getDaysInMonth,
  getMonth,
  getYear,
  set,
} from "date-fns-jalali";
import { useEffect, useMemo } from "react";

const year = getYear(new Date());
const years = getRange(year - 100, year + 1).map((item) => String(item));

const monthNames = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export type DatePickerProps = {
  className?: string;
  children?: never;
};

const slidesPerView = 5;

export function DatePickerPanel(props: DatePickerProps) {
  const { className, ...otherProps } = props;
  const {
    writeChanges,
    date,
    onChangeDate,
    datePickerOpen,
    onDatePickerOpenChange,
    onTimePickerOpenChange,
    registers,
    register,
    unRegister,
  } = useDateTimePickerContext();

  useEffect(() => {
    register(Picker.Date);
    return () => {
      unRegister(Picker.Date);
    };
  }, []);

  const days = useMemo(() => {
    return getRange(1, getDaysInMonth(date) + 1).map((item) =>
      String(item).padStart(2, "0"),
    );
  }, [getMonth(date)]);

  return (
    <div
      className={cn(
        "relative flex max-w-full cursor-pointer overflow-hidden rounded-xl [direction:ltr]",
      )}
    >
      <RangeSlider
        slidesPerView={slidesPerView}
        options={years}
        value={getYear(date).toString()}
        onChange={(year) => {
          onChangeDate((date) => {
            return set(date, {
              year: Number(year),
            });
          });
        }}
      />
      <RangeSlider
        slidesPerView={slidesPerView}
        options={monthNames}
        value={monthNames[getMonth(date)]}
        onChange={(monthName) => {
          onChangeDate((date) => {
            return set(date, {
              month: monthNames.findIndex((item) => item === monthName),
            });
          });
        }}
      />
      <RangeSlider
        slidesPerView={slidesPerView}
        options={days}
        value={getDate(date).toString().padStart(2, "0")}
        onChange={(day) => {
          const daysInMonth = getDaysInMonth(date);
          onChangeDate((date) => {
            return set(date, {
              date: day ? Number(day) : daysInMonth,
            });
          });
        }}
      />
      <div className="absolute inset-x-0 top-1/2 h-8 -translate-y-1/2 rounded-xl bg-blue-500/10" />
    </div>
  );
}

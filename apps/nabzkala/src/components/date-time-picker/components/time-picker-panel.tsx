import { cn } from "@/lib/utils";
import { Dialog } from "@/components/dialog";
import { ClockIcon } from "lucide-react";
import { RangeSlider } from "@/components/date-time-picker/components/range-slider";
import { Picker, useDateTimePickerContext } from "../context";
import { getRange } from "@/components/date-time-picker/utils";
import { getHours, getMinutes, getSeconds, set } from "date-fns-jalali";
import { Button } from "@/components/button";
import { useEffect } from "react";

export type TimePickerProps = {
  className?: string;
  children?: never;
};

const slidesPerView = 5;

const hours = getRange(0, 24).map((item) => item.toString().padStart(2, "0"));
const minutes = getRange(0, 60).map((item) => item.toString().padStart(2, "0"));
const seconds = minutes;

export function TimePickerPanel(props: TimePickerProps) {
  const { className, ...otherProps } = props;
  const {
    writeChanges,
    date,
    onChangeDate,
    timePickerOpen,
    onTimePickerOpenChange,
    register,
    unRegister,
  } = useDateTimePickerContext();

  useEffect(() => {
    register(Picker.Time);
    return () => {
      unRegister(Picker.Time);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative flex max-w-full cursor-pointer overflow-hidden rounded-xl [direction:ltr]",
      )}
    >
      <RangeSlider
        slidesPerView={slidesPerView}
        options={hours}
        value={getHours(date).toString().padStart(2, "0")}
        onChange={(hours) => {
          onChangeDate((date) => {
            return set(date, {
              hours: Number(hours),
            });
          });
        }}
      />
      <RangeSlider
        slidesPerView={slidesPerView}
        options={minutes}
        value={getMinutes(date).toString().padStart(2, "0")}
        onChange={(minutes) => {
          onChangeDate((date) => {
            return set(date, {
              minutes: Number(minutes),
            });
          });
        }}
      />
      <RangeSlider
        slidesPerView={slidesPerView}
        options={seconds}
        value={getSeconds(date).toString().padStart(2, "0")}
        onChange={(seconds) => {
          onChangeDate((date) => {
            return set(date, {
              seconds: Number(seconds),
            });
          });
        }}
      />
      <div className="absolute inset-x-0 top-1/2 h-8 -translate-y-1/2 rounded-xl bg-blue-500/10" />
    </div>
  );
}

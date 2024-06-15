import {
  Dispatch,
  forwardRef,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import {
  DateTimeContext,
  Picker,
} from "src/components/date-time-picker/context";
import { getDateObj } from "src/components/date-time-picker/utils";
import { format, parse } from "date-fns";
import { Popover } from "@/components/popover";

export const DEFAULT_DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";

export type DateTimeRenderPropArg = {
  value: string | null;
  date: Date | null;
  timePickerOpen: boolean;
  datePickerOpen: boolean;
};

export type DateTimeProps = {
  className?: string;
  /**
   * Default format is yyyy-MM-dd hh:mm:ss
   */
  format?: string;
  /**
   * Formated date
   */
  value?: string | null;
  onChange?: (value: string) => void;
  children: ReactNode | ((props: DateTimeRenderPropArg) => ReactNode);
};

const DateTimePicker = forwardRef<HTMLButtonElement, DateTimeProps>(
  (props, ref) => {
    const {
      children,
      value,
      onChange,
      format: dateFormat = DEFAULT_DATE_FORMAT,
    } = props;
    const [date, setDate] = useState(getDateObj(value, dateFormat));
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [timePickerOpen, setTimePickerOpen] = useState(false);
    const [pickers, setPickers] = useState<Picker[]>([]);

    const slot = useMemo(
      () =>
        ({
          value: value || null,
          date: value ? parse(value, dateFormat, new Date()) : null,
          datePickerOpen,
          timePickerOpen,
        }) satisfies DateTimeRenderPropArg,
      [value, date, datePickerOpen, timePickerOpen],
    );

    const handleRegister = (picker: Picker) => {
      setPickers((pickers) => [...pickers, picker]);
    };

    const handleUnRegister = (picker: Picker) => {
      setPickers((pickers) => pickers.filter((item) => item !== picker));
    };

    if (pickers.length > 2) {
      throw new Error("Cannot use more than one picker of the same type");
    }

    const handleChangeDate: Dispatch<SetStateAction<Date>> = (value) => {
      if (typeof value === "function") {
        const newDate = new Date(date.getTime());
        const updatedDate = value(newDate);
        setDate(updatedDate);
        return;
      }
      setDate(value);
    };

    // Write changes to real value with onChange
    const writeChanges = () => {
      onChange && onChange(format(date, dateFormat));
    };

    return (
      <DateTimeContext.Provider
        value={{
          format: dateFormat,
          value,
          writeChanges,
          date,
          onChangeDate: handleChangeDate,
          datePickerOpen: datePickerOpen,
          onDatePickerOpenChange: setDatePickerOpen,
          timePickerOpen: timePickerOpen,
          onTimePickerOpenChange: setTimePickerOpen,
          registers: pickers,
          register: handleRegister,
          unRegister: handleUnRegister,
        }}
      >
        <Popover>
          {typeof children === "function" ? children(slot) : children}
        </Popover>
      </DateTimeContext.Provider>
    );
  },
);

DateTimePicker.displayName = "DateTime";

export { DateTimePicker };

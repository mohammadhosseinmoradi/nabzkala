import { createContext, Dispatch, SetStateAction, useContext } from "react";

export enum Picker {
  Date,
  Time,
}

export type DateTimeContextProps = {
  format: string;
  value?: string | null;
  writeChanges: () => void;
  date: Date;
  onChangeDate: Dispatch<SetStateAction<Date>>;
  timePickerOpen: boolean;
  onTimePickerOpenChange: (open: boolean) => void;
  datePickerOpen: boolean;
  onDatePickerOpenChange: (open: boolean) => void;
  registers: Picker[];
  register: (picker: Picker) => void;
  unRegister: (picker: Picker) => void;
};

export const DateTimeContext = createContext<DateTimeContextProps | null>(null);

export function useDateTimePickerContext() {
  const context = useContext(DateTimeContext);
  if (!context)
    throw new Error(
      "useTimePickerContext must be used within TimePickerContext",
    );
  return context;
}

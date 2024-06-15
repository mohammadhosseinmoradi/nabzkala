import { DateTimePicker as _DateTimePicker } from "./components/date-time-picker";
import { Input } from "./components/input";
import { Panel } from "./components/panel";
import { DatePickerPanel } from "src/components/date-time-picker/components/date-picker-panel";
import { TimePickerPanel } from "src/components/date-time-picker/components/time-picker-panel";

const DateTimePicker = Object.assign(_DateTimePicker, {
  Input,
  Panel,
  DatePickerPanel,
  TimePickerPanel,
});

export { DateTimePicker };

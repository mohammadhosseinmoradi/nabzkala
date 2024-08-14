import { DateTimePicker as _DateTimePicker } from "src/components/date-time-picker/components/date-time-picker";
import { Input } from "src/components/date-time-picker/components/input";
import { Panel } from "src/components/date-time-picker/components/panel";
import { DatePickerPanel } from "src/components/date-time-picker/components/date-picker-panel";
import { TimePickerPanel } from "src/components/date-time-picker/components/time-picker-panel";

const DateTimePicker = Object.assign(_DateTimePicker, {
  Input,
  Panel,
  DatePickerPanel,
  TimePickerPanel,
});

export { DateTimePicker };

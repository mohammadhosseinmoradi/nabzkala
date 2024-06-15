import {
  ComponentRef,
  ElementType,
  forwardRef,
  Fragment,
  ReactNode,
  Ref,
  useMemo,
} from "react";
import {
  forwardRefWithAs,
  HasDisplayName,
  mergePropsAdvanced,
  RefProp,
  render,
} from "@/lib/utils/render";
import { Picker, useDateTimePickerContext } from "../context";
import { Props } from "@/lib/utils/render/types";
import { format } from "date-fns-jalali";
import { parse } from "date-fns";
import { getDateObj } from "../utils";
import { Popover } from "@/components/popover";

let DEFAULT_INPUT_TAG = "input" as const;

type InputRenderPropArg = {
  open: boolean;
  date: Date | null;
};

type ButtonPropsWeControl = never;

export type InputProps<TTag extends ElementType = typeof DEFAULT_INPUT_TAG> =
  Props<
    TTag,
    InputRenderPropArg,
    ButtonPropsWeControl,
    {
      value?: string;
      onChange?: (value: string) => void;
      /**
       * Date format
       */
      format?: string;
    }
  >;

function InputFn<TTag extends ElementType = typeof DEFAULT_INPUT_TAG>(
  props: InputProps<TTag>,
  ref: Ref<ComponentRef<TTag>>,
) {
  const {
    value: dateTimeValue,
    date,
    datePickerOpen,
    onDatePickerOpenChange,
    timePickerOpen,
    onTimePickerOpenChange,
    format: dateFormat,
    registers,
  } = useDateTimePickerContext();

  const {
    onClick,
    value,
    as = "input",
    format: inputDateFormat,
    ...theirProps
  } = props;

  let ourProps = mergePropsAdvanced({
    ref,
    onClick(e: any) {
      getDateObj(dateTimeValue);
      if (registers.findIndex((register) => register === Picker.Date) > -1) {
        onDatePickerOpenChange(true);
      } else if (
        registers.findIndex((register) => register === Picker.Time) > -1
      ) {
        onTimePickerOpenChange(true);
      }
    },
    value: dateTimeValue
      ? format(
          parse(dateTimeValue, dateFormat, new Date()),
          inputDateFormat ? inputDateFormat : dateFormat,
        )
      : "",
    onChange: () => {},
  });

  let slot = useMemo(
    () =>
      ({
        date: dateTimeValue
          ? parse(dateTimeValue, dateFormat, new Date())
          : null,
        open: timePickerOpen || datePickerOpen,
      }) satisfies InputRenderPropArg,
    [dateTimeValue, timePickerOpen, datePickerOpen, dateFormat],
  );

  return (
    <Popover.Button as={Fragment} {...ourProps} {...theirProps}>
      <ForwardProps>
        {(props: any) => {
          return render({
            ourProps: props,
            theirProps: { as },
            slot,
            defaultTag: DEFAULT_INPUT_TAG,
            name: "DatePicker.Input",
          });
        }}
      </ForwardProps>
    </Popover.Button>
  );
}

interface _internal_ComponentInput extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_INPUT_TAG>(
    props: InputProps<TTag> & RefProp<typeof InputFn<TTag>>,
  ): ReactNode;
}

const Input = forwardRefWithAs(InputFn) as unknown as _internal_ComponentInput;

export { Input };

const ForwardProps = forwardRef<any, any>((props: any, ref) => {
  const { children, ...otherProps } = props;
  return children({ ...otherProps, ref });
});

ForwardProps.displayName = "ForwardProps";

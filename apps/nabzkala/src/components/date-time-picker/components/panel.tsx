import { Popover } from "@/components/popover";
import { Tab } from "@/components/tab";
import { DatePickerPanel } from "@/components/date-time-picker/components/date-picker-panel";
import { TimePickerPanel } from "@/components/date-time-picker/components/time-picker-panel";
import { Button } from "@/components";
import { useDateTimePickerContext } from "@/components/date-time-picker/context";
import { CalendarDaysIcon, Clock9Icon } from "lucide-react";

export function Panel() {
  const { writeChanges } = useDateTimePickerContext();

  return (
    <Popover.Panel>
      <Popover.Header className="max-lg:p-1" />
      <Popover.Body className="pt-0 px-0">
        <Tab.Group>
          <Tab.List className="[&>*]:w-full">
            <Tab className="w-1/2 py-3.5">
              <CalendarDaysIcon size={16} />
              تاریخ
            </Tab>
            <Tab className="w-1/2 py-3.5">
              <Clock9Icon size={16} />
              ساعت
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-4 px-4">
            <Tab.Panel>
              <DatePickerPanel className="" />
            </Tab.Panel>
            <Tab.Panel>
              <TimePickerPanel />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </Popover.Body>
      <Popover.Actions className="border-t bg-neutral-50 p-4">
        <Popover.Button
          as={Button}
          className="min-w-28"
          onClick={() => {
            writeChanges();
          }}
        >
          انتخاب
        </Popover.Button>
        <Popover.Button
          as={Button}
          className="min-w-20"
          outlined
          color="secondary"
        >
          بستن
        </Popover.Button>
      </Popover.Actions>
    </Popover.Panel>
  );
}

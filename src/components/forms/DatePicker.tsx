import { useState } from "react";
import { Popover } from "@headlessui/react";
import { DatePickerCalendar } from "./DatePickerCalendar";
import { DatePickerSelector } from "./DatePickerSelector";
import { DatePickerI } from "./interfaces";

export const DatePicker = ({ selectedDate, onChange }: DatePickerI) => {
  const [shownDate, setShownDate] = useState(selectedDate);
  return (
    <Popover>
      <Popover.Button>{selectedDate.format("DD/MM/YYYY")}</Popover.Button>
      <Popover.Panel className="shadow-3xl rounded-lg w-[355px] pb-6">
        <DatePickerSelector shownDate={shownDate} setShownDate={setShownDate} />
        <DatePickerCalendar
          selectedDate={selectedDate}
          shownDate={shownDate}
          onChange={onChange}
        />
      </Popover.Panel>
    </Popover>
  );
};

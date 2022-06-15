import { useState } from "react";
import { DatePickerCalendar } from "./DatePickerCalendar";
import { DatePickerSelector } from "./DatePickerSelector";
import { DatePickerI } from "./interfaces";

export const DatePicker = ({ selectedDate, onChange }: DatePickerI) => {
  const [shownDate, setShownDate] = useState(selectedDate);
  return (
    <div className="shadow-3xl rounded-lg w-[355px] pb-6">
      <DatePickerSelector shownDate={shownDate} setShownDate={setShownDate} />

      <DatePickerCalendar
        selectedDate={selectedDate}
        shownDate={shownDate}
        onChange={onChange}
      />
    </div>
  );
};

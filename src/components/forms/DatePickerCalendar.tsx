import React, { useMemo } from "react";
import { Dayjs } from "dayjs";

import { getCalendarRows } from "./utils";
import { CustomText } from "../typography";

export interface IDatePickerCalendarProps {
  shownDate: Dayjs;
  selectedDate: Dayjs;

  onChange: (newDate: Dayjs) => void;
}

export const DatePickerCalendar: React.FC<IDatePickerCalendarProps> = ({
  shownDate,
  selectedDate,
  onChange
}) => {
  const handleSelectDate = (value: Dayjs) => {
    return () => onChange(value);
  };

  const rows = useMemo(() => getCalendarRows(shownDate), [shownDate]);

  return (
    <>
      <div className="flex justify-between my-2 mx-6">
        {rows[0].map(({ value }, i) => (
          <div key={i} className="w-10 text-center">
            <CustomText variant="small" color="text-neutral3">
              {value.format("dd")}
            </CustomText>
          </div>
        ))}
      </div>

      {rows.map((cells, rowIndex) => (
        <div key={rowIndex} className="flex justify-between mx-6">
          {cells.map(({ text, value }, i) => {
            const isSelected = value.isSame(selectedDate, "day");
            const isBefore = value.isBefore(selectedDate);
            return (
              <div
                key={`${text} - ${i}`}
                className={`rounded-md w-10 h-10 flex justify-center items-center mb-1 ${
                  isSelected
                    ? "bg-dark text-white"
                    : isBefore
                    ? "bg-neutral2 text-neutral3"
                    : "bg-white border border-dark"
                }`}
                onClick={handleSelectDate(value)}
              >
                <p className="leading-0"> {text}</p>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};

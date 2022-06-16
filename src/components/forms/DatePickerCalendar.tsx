import { useMemo } from "react";
import { Popover } from '@headlessui/react';
import { Dayjs } from "dayjs";

import { getCalendarRows } from "./utils";
import { CustomText } from "../typography";
import { DatePickerCalendarI } from "./interfaces";

export const DatePickerCalendar: React.FC<DatePickerCalendarI> = ({
  shownDate,
  selectedDate,
  onChange
}) => {
  const handleSelectDate = (value: Dayjs) => {
    return () => onChange(value);
  };

  const rows = useMemo(() => getCalendarRows(shownDate), [shownDate]);

  const styles = {
    container: "flex justify-between my-2 w-[19rem] mx-auto",
    rows: "w-10 text-center",
    cells: {
      container: "flex justify-start gap-1 w-[19rem] mx-auto",
      button: (isSelected: boolean, isBefore: boolean) =>
        `cursor-pointer rounded-md w-10 h-10 flex justify-center items-center mb-1 ${
          isSelected
            ? "bg-dark text-white"
            : isBefore
            ? "bg-neutral2 text-neutral3"
            : "bg-white border border-dark"
        }`,
      text: "leading-0"
    }
  };

  return (
    <>
      <div className={styles.container}>
        {rows[0].map(({ value }, i) => (
          <div key={i} className={styles.rows}>
            <CustomText variant="small" color="neutral3">
              {value.format("dd")}
            </CustomText>
          </div>
        ))}
      </div>

      {rows.map((cells, rowIndex) => (
        <div key={rowIndex} className={styles.cells.container}>
          {cells.map(({ text, value }, i) => {
            const isSelected = value.isSame(selectedDate, "day");
            const isBefore = value.isBefore(selectedDate);
            return (
              <Popover.Button
                key={`${text} - ${i}`}
                className={styles.cells.button(isSelected, isBefore)}
                onClick={handleSelectDate(value)}
              >
                <p className={styles.cells.text}> {text}</p>
              </Popover.Button>
            );
          })}
        </div>
      ))}
    </>
  );
};

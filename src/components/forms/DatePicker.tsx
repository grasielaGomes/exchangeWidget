import { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import dayjs from "dayjs";

import { DatePickerCalendar } from "./DatePickerCalendar";
import { DatePickerSelector } from "./DatePickerSelector";
import { DatePickerI } from "./interfaces";
import { CustomText } from "../typography/CustomText";
import { Calendar } from "../../assets";

const styles = {
  popover: "flex-1 relative",
  selectButton:
    "flex-1 w-full border rounded-lg border-neutral h-11 focus:outline-none focus:border-primary focus:ring-primary focus:ring-0 md:w-[10rem]",
  label: "mb-1 md:text-neutral3",
  selectButtonContent: "flex items-center justify-around ",
  panel: "fixed bottom-4 left-[1rem] right-[1rem] z-50",
  calendarContainer: "w-full bg-white shadow-3xl rounded-lg pb-6 "
};

const texts = {
  calendar: "Calendar Icon",
  today: "Today",
  select: "Select",
  label: "Date"
};

export const DatePicker = ({ label = texts.label, onChange, selectedDate }: DatePickerI) => {
  const [shownDate, setShownDate] = useState(selectedDate);
  const isToday =
    selectedDate?.isSame(dayjs(), "day") &&
    selectedDate?.isSame(dayjs(), "month");
  const isSelected = !selectedDate?.isSame(dayjs().subtract(7, "day"), "day");

  return (
    <Popover className={styles.popover}>
      <div className={styles.label}>
        <CustomText variant="small">{label}</CustomText>
      </div>
      <Popover.Button className={styles.selectButton}>
        <div className={styles.selectButtonContent}>
          <CustomText variant="small" color="neutral3">
            {isToday
              ? texts.today
              : isSelected
              ? selectedDate.format("DD/MM")
              : texts.select}
          </CustomText>
          <img src={Calendar} alt={texts.calendar} height="1rem" width="auto" />
        </div>
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className={styles.panel}>
          <div className={styles.calendarContainer}>
            <DatePickerSelector
              shownDate={shownDate}
              setShownDate={setShownDate}
            />
            <DatePickerCalendar
              selectedDate={selectedDate}
              shownDate={shownDate}
              onChange={onChange}
            />
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

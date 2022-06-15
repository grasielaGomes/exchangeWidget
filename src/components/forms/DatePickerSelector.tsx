import React from "react";
import { Dayjs } from "dayjs";

import { changeDateMonth } from "./utils";
import { Heading } from "../typography/index";
import { Chevron } from "../../assets";

export interface IDatePickerSelectorProps {
  shownDate: Dayjs;
  setShownDate: React.Dispatch<React.SetStateAction<Dayjs>>;
}

export const DatePickerSelector: React.FC<IDatePickerSelectorProps> = ({
  shownDate,
  setShownDate
}) => {
  const handleIconClick = (isNextMonth: boolean) => {
    return () => {
      setShownDate(changeDateMonth(shownDate, isNextMonth));
    };
  };

  return (
    <div className="flex justify-between items-center mt-4 mx-6">
      <button
        type="button"
        className="w-10 h-10"
        onClick={handleIconClick(false)}
      >
        <img src={Chevron} alt="preview month icon" className="m-auto" />
      </button>

      <Heading variant="h3">{shownDate.format("MMMM YYYY")}</Heading>

      <button
        type="button"
        className="w-10 h-10"
        onClick={handleIconClick(true)}
      >
        <img
          src={Chevron}
          alt="next month icon"
          className="rotate-180 m-auto"
        />
      </button>
    </div>
  );
};

import React from "react";

import { changeDateMonth } from "./utils";
import { Heading } from "../typography/Heading";
import { Chevron } from "../../assets";
import { DatePickerSelectorI } from "./interfaces";

export const DatePickerSelector: React.FC<DatePickerSelectorI> = ({
  shownDate,
  setShownDate
}) => {
  const handleIconClick = (isNextMonth: boolean) => {
    return () => {
      setShownDate(changeDateMonth(shownDate, isNextMonth));
    };
  };

  const baseButtonStyle = "w-10 h-10";

  return (
    <div className="flex justify-between items-center mt-4 mx-6 pt-3">
      <button
        type="button"
        className={baseButtonStyle}
        onClick={handleIconClick(false)}
      >
        <img src={Chevron} alt="preview month icon" className="m-auto" />
      </button>

      <Heading variant="h3">{shownDate.format("MMMM YYYY")}</Heading>

      <button
        type="button"
        className={baseButtonStyle}
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

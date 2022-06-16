import React from "react";

import { changeDateMonth } from "./utils";
import { Heading } from "../typography/Heading";
import { Chevron } from "../../assets";
import { DatePickerSelectorI } from "./interfaces";

const styles = {
  container:
    "flex justify-between items-center mt-4 mx-6 pt-3 w-[19rem] mx-auto",
  button: "w-10 h-10",
  leftIcon: "m-auto",
  rightIcon: "rotate-180 m-auto"
};

const texts = {
  leftIconAlt: "preview month icon",
  rightIconAlt: "next month icon"
};

export const DatePickerSelector: React.FC<DatePickerSelectorI> = ({
  shownDate,
  setShownDate
}) => {
  const handleIconClick = (isNextMonth: boolean) => {
    return () => {
      setShownDate(changeDateMonth(shownDate, isNextMonth));
    };
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.button}
        onClick={handleIconClick(false)}
      >
        <img
          src={Chevron}
          alt={texts.leftIconAlt}
          className={styles.leftIcon}
        />
      </button>

      <Heading variant="h3">{shownDate.format("MMMM YYYY")}</Heading>

      <button
        type="button"
        className={styles.button}
        onClick={handleIconClick(true)}
      >
        <img
          src={Chevron}
          alt={texts.rightIconAlt}
          className={styles.rightIcon}
        />
      </button>
    </div>
  );
};

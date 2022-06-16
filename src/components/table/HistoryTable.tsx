import dayjs from "dayjs";

import { Heading } from "../typography/Heading";
import { DatePicker } from "../forms/DatePicker";
import { useState } from "react";
import { FullButton } from "../buttons";

const styles = {
  container: "px-6 py-12 w-full md:w-3/5 md:mx-auto",
  dateContainer: "flex justify-between items-end gap-4 my-3",
  table: {},
  tableHead: {},
  tableHeadRow: {},
  tableHeadCell: {},
  tableBody: {}
};

const texts = {
  tableHead: "History",
  dateSelectors: {
    labelStart: "Start Date",
    labelEnd: "End Date",
    filterButton: "Filter"
  },
  tableHeadRow: "Date",
  tableHeadCell: "Amount",
  tableBody: "Amount"
};

export const HistoryTable = () => {
  const [startDate, setStartDate] = useState(dayjs().subtract(7, "day"));
  const [endDate, setEndDate] = useState(dayjs());

  return (
    <section className={styles.container}>
      <Heading>{texts.tableHead}</Heading>
      <div className={styles.dateContainer}>
        <DatePicker
          label={texts.dateSelectors.labelStart}
          selectedDate={startDate}
          onChange={setStartDate}
        />
        <DatePicker
          label={texts.dateSelectors.labelEnd}
          selectedDate={endDate}
          onChange={setEndDate}
        />
        <FullButton
          variant="secondary"
          handleClick={() => {}}
        >
          {texts.dateSelectors.filterButton}
        </FullButton>
      </div>
    </section>
  );
};

import { Heading } from "../typography/Heading";
import { DatePicker } from "../forms/DatePicker";
import { FullButton } from "../buttons";
import { TableRowMobile } from "./TableRowMobile";
import { DropdowMenu } from "../forms/DropdowMenu";
import { Sort } from "../../assets";
import { TableRowDesktop } from "./TableRowDesktop";
import { useHistoryTransactions } from "./hooks/useHistoryTransactions";
import { Pagination } from "../pagination/Pagination";
import { SpinLoading } from "../loadings/SpinLoading";

const styles = {
  container: "px-6 py-12 w-full md:w-[1095px] md:px-0 md:mx-auto",
  fechingLoadingContainer: "flex gap-3 items-center",
  dateContainer:
    "flex justify-between items-end gap-4 mt-3 mb-5 md:mt-5 md:mb-[45px] md:justify-end md:w-fit",
  filterSelector: "hidden md:block",
  tableContainerMobile: "grid gap-3 md:hidden",
  tableContainerDesktop: "hidden md:block",
  table: {
    header: "flex py-1 bg-neutral2 h-[30px] rounded",
    title: "text-sm font-normal text-dark text-left",
    titleButton: (index: number) =>
      `flex gap-2 items-center ${
        index !== 0 && "border-l-tiny"
      } border-neutral3 pl-2 ${
        index % 2 === 0 ? "w-[210px]" : "w-[154px]"
      } underline-offset-1 hover:underline focus:underline focus:outline-none`
  },
  loadingContainer: "flex items-center justify-center w-full h-[20rem]"
};

const texts = {
  tableHead: "History",
  dateSelectors: {
    labelStart: "Start Date",
    labelStartDesktop: "From Date",
    labelEnd: "End Date",
    labelEndDesktop: "To Date",
    labelType: "Type",
    filterButton: "Filter"
  },
  filterSelect: {
    label: "Type",
    options: [
      { id: "ALL", value: "All" },
      { id: "EXCHANGED", value: "Exchanged" },
      { id: "LIVE", value: "Live price" }
    ]
  },
  table: {
    columns: [
      "Date & Time",
      "Currency From",
      "Amount 1",
      "Currency To",
      "Amount 2",
      "Type"
    ],
    sortIconAlt: "Sort columns icon"
  }
};

export const HistoryTable = () => {
  const {
    endDate,
    error,
    filterTransactionsByType,
    historyList,
    isFetching,
    isLoading,
    isMobile,
    startDate,
    setStartDate,
    setEndDate
  } = useHistoryTransactions();

  return (
    <section className={styles.container}>
      <div className={styles.fechingLoadingContainer}>
        <Heading>{texts.tableHead}</Heading>
        {!isLoading && isFetching && <SpinLoading />}
      </div>
      <div className={styles.dateContainer}>
        <DatePicker
          label={
            isMobile
              ? texts.dateSelectors.labelStart
              : texts.dateSelectors.labelStartDesktop
          }
          selectedDate={startDate}
          onChange={setStartDate}
        />
        <DatePicker
          label={
            isMobile
              ? texts.dateSelectors.labelEnd
              : texts.dateSelectors.labelEndDesktop
          }
          selectedDate={endDate}
          onChange={setEndDate}
        />
        <div className={styles.filterSelector}>
          <DropdowMenu
            handleSelect={(option) => filterTransactionsByType(option.id)}
            initialOption={texts.filterSelect.options[0]}
            label={texts.filterSelect.label}
            options={texts.filterSelect.options}
          />
        </div>
        <FullButton variant="secondary" handleClick={() => {}}>
          {texts.dateSelectors.filterButton}
        </FullButton>
      </div>
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <SpinLoading />
        </div>
      ) : error ? (
        <h1>Error...</h1>
      ) : (
        <div>
          <div className={styles.tableContainerMobile}>
            {historyList?.map((transaction) => (
              <div key={transaction.id}>
                <TableRowMobile transaction={transaction} />
              </div>
            ))}
          </div>
          <div className={styles.tableContainerDesktop}>
            <div className={styles.table.header}>
              {texts.table.columns.map((column, index) => (
                <div key={column} className={styles.table.title}>
                  <button className={styles.table.titleButton(index)}>
                    {index === 0 && (
                      <img src={Sort} alt={texts.table.sortIconAlt} />
                    )}
                    {column}
                  </button>
                </div>
              ))}
            </div>
            {historyList?.map((transaction, index) => (
              <div key={transaction.id}>
                <TableRowDesktop index={index} transaction={transaction} />
              </div>
            ))}
          </div>
          <Pagination pagesNumber={1} />
        </div>
      )}
    </section>
  );
};

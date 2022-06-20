import { useState, useEffect } from "react";
import dayjs from "dayjs";

import { useTransactions } from "../../../hooks/transactions/useTransactions";
import useWindowDimensions from "../../../hooks/utils/useWindowDimensions";
import { useHistoryReducer } from "../../../hooks/historyReducer/useHistoryReducer";

export const useHistoryTable = () => {
  const { mappedTransactions } = useTransactions();
  const { historyList, dispatch } = useHistoryReducer();

  const [startDate, setStartDate] = useState(dayjs().subtract(7, "day"));
  const [endDate, setEndDate] = useState(dayjs());
  const [dateError, setDateError] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  // Update history list
  useEffect(() => {
    dispatch({
      type: "FETCH_HISTORY",
      fetchedHistory: mappedTransactions || []
    });
  }, [mappedTransactions]);

  // Get filtered transactions by date
  const filterTransactionsByDate = () => {
    setDateError(false);

    if (dayjs(startDate).isBefore(endDate)) {
      dispatch({ type: "FILTER_BY_DATE", payload: { startDate, endDate } });
    } else {
      setDateError(true);
    }
  };

  // Get filtered transactions by type
  const filterTransactionsByType = (type: string) => {
    const transactionTypes = {
      ALL: () => dispatch({ type: "FILTER_BY_ALL" }),
      LIVE: () => dispatch({ type: "FILTER_BY_LIVE" }),
      EXCHANGED: () => dispatch({ type: "FILTER_BY_EXCHANGED" })
    };

    transactionTypes[type as keyof typeof transactionTypes]();
  };

  // Sort transactions by column selected
  const sortTransactions = (column: string) => {
    const columns = {
      "Date & Time": () => dispatch({ type: "SORT_BY_DATE" }),
      "Currency From": () => dispatch({ type: "SORT_BY_CURRENCY_FROM" }),
      "Amount 1": () => dispatch({ type: "SORT_BY_AMOUNT_1" }),
      "Currency To": () => dispatch({ type: "SORT_BY_CURRENCY_TO" }),
      "Amount 2": () => dispatch({ type: "SORT_BY_AMOUNT_2" }),
      Type: () => dispatch({ type: "SORT_BY_TYPE" })
    };
    columns[column as keyof typeof columns]();
  };

  // Handle pagination change
  const handleTransactionsPerPage = (value: number) => {
    dispatch({ type: "CHANGE_PAGINATION", payload: { value } });
  };

  return {
    dateError,
    endDate,
    filterTransactionsByDate,
    filterTransactionsByType,
    handleTransactionsPerPage,
    historyList,
    isMobile,
    startDate,
    setStartDate,
    setEndDate,
    sortTransactions
  };
};

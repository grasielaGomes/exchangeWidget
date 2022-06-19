import { useReducer, useState } from "react";
import { useQuery } from "react-query";
import dayjs from "dayjs";

import { ExchangeTransactionI, TransactionRateI } from "../interfaces";
import { countries } from "../../forms/helpers";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { useRates } from "../../../hooks/currencyRates/useRates";
import { useTransactions } from "../../../hooks/transactions/useTransactions";

export const useHistoryTransactions = () => {
  const [startDate, setStartDate] = useState(dayjs().subtract(7, "day"));
  const [endDate, setEndDate] = useState(dayjs());
  const [dateError, setDateError] = useState(false);

  interface ReducerTransactionsI {
    historyList: ExchangeTransactionI[];
    previousList: ExchangeTransactionI[];
  }

  const INITIAL_STATE: ReducerTransactionsI = {
    historyList: [],
    previousList: []
  };

  type TransactionAction =
    | {
        type: "FETCH_HISTORY";
        fetchedHistory: ExchangeTransactionI[];
      }
    | { type: "FILTER_BY_DATE" }
    | { type: "FILTER_BY_LIVE" }
    | { type: "FILTER_BY_EXCHANGED" }
    | { type: "FILTER_BY_ALL" };

  const transactionsReducer = (
    state: ReducerTransactionsI,
    action: TransactionAction
  ): ReducerTransactionsI => {
    switch (action.type) {
      case "FETCH_HISTORY":
        return {
          previousList: action.fetchedHistory,
          historyList: action.fetchedHistory
        };
      case "FILTER_BY_DATE":
        return {
          ...state,
          historyList: state.previousList.filter((t) => {
            return (
              dayjs(t.date) >= dayjs(startDate) &&
              dayjs(t.date) <= dayjs(endDate)
            );
          })
        };
      case "FILTER_BY_LIVE":
        return {
          ...state,
          historyList: state.previousList.filter((t) => {
            return t.status === "LIVE";
          })
        };
      case "FILTER_BY_EXCHANGED":
        return {
          ...state,
          historyList: state.previousList.filter((t) => {
            return t.status === "EXCHANGED";
          })
        };
      case "FILTER_BY_ALL":
        return {
          ...state,
          historyList: state.previousList
        };
      default:
        return state;
    }
  };

  const [{ historyList }, dispatch] = useReducer(
    transactionsReducer,
    INITIAL_STATE
  );

  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const { getRates } = useRates();
  const { getTransactions } = useTransactions();

  // Get rates from API using react-query to cache the data
  const { data: rates } = useQuery("rates", getRates);

  // Map transactions to a list of transactions with live and exchanged results
  const getHistoryTransactions = async (
    rates: TransactionRateI[] | undefined
  ) => {
    // Get transactions history
    const transactions = await getTransactions();

    // Map transactions to exchange transactions
    const transactionsMapped: ExchangeTransactionI[] = transactions.map(
      (transaction: ExchangeTransactionI) => {
        const isExchanged = transaction.status === "EXCHANGED";

        // Get live currency rate
        const liveRate = rates?.find((rate) => rate.target === transaction.to)
          ?.rates[transaction.from];

        // Get total amount
        const total =
          Number(transaction.amount) * Number(transaction.currencyRate);

        // Get live total amount
        const liveTotal = (1 / (liveRate || 1)) * Number(transaction.amount);

        // Format amount based on currency code
        const totalFormatted = total.toLocaleString(
          countries[transaction.to as keyof typeof countries],
          {
            style: "currency",
            currency: transaction.to
          }
        );

        // Format amount based on USD
        const liveTotalFormatted = liveTotal.toLocaleString("en-US", {
          style: "currency",
          currency: "USD"
        });

        return {
          amount: transaction.amount,
          currencyRate: isExchanged ? total : liveRate,
          date: transaction.date,
          from: transaction.from,
          id: transaction.id,
          to: isExchanged ? transaction.to : "USD",
          totalAmount: isExchanged ? totalFormatted : liveTotalFormatted,
          status: transaction.status
        };
      }
    );

    // Update history list
    dispatch({
      type: "FETCH_HISTORY",
      fetchedHistory: transactionsMapped
    });

    return transactionsMapped;
  };

  // Get transactions from API using react-query to cache the data
  const { isLoading, isFetching, error } = useQuery("transactions", () =>
    getHistoryTransactions(rates)
  );

  // Get filtered transactions by date
  const filterTransactions = () => {
    setDateError(false);

    if (dayjs(startDate).isBefore(endDate)) {
      dispatch({ type: "FILTER_BY_DATE" });
    } else {
      setDateError(true);
    }
  };

  // Get filtered transactions by type
  const handleType = (type: string) => {
    console.log(type);
    console.log(historyList);
    if (type === "ALL") {
      dispatch({ type: "FILTER_BY_ALL" });
    } else if (type === "LIVE") {
      dispatch({ type: "FILTER_BY_LIVE" });
    } else {
      dispatch({ type: "FILTER_BY_EXCHANGED" });
    }
  };

  return {
    dateError,
    endDate,
    error,
    filterTransactions,
    handleType,
    historyList,
    isFetching,
    isLoading,
    isMobile,
    startDate,
    setStartDate,
    setEndDate
  };
};

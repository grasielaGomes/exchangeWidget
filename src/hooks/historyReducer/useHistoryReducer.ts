import dayjs, { Dayjs } from "dayjs";
import { useReducer } from "react";
import { ExchangeTransactionI } from "../../components/table/interfaces";
import {
  calcEndTransaction,
  calcStartTransaction,
  filterTransactions
} from "../../utils";

export const useHistoryReducer = () => {
  interface ReducerTransactionsI {
    filteredList: ExchangeTransactionI[];
    historyList: ExchangeTransactionI[];
    initialList: ExchangeTransactionI[];
    start: number;
    end: number;
  }

  // Reducer initial state
  const INITIAL_STATE: ReducerTransactionsI = {
    filteredList: [],
    historyList: [],
    initialList: [],
    start: 0,
    end: 5
  };

  // Reducer types and payloads
  type TransactionAction =
    | {
        type: "FETCH_HISTORY";
        fetchedHistory: ExchangeTransactionI[];
      }
    | {
        type: "FILTER_BY_DATE";
        payload: {
          startDate: Date | Dayjs | string;
          endDate: Date | Dayjs | string;
          type: string;
        };
      }
    | { type: "FILTER_BY_LIVE" }
    | { type: "FILTER_BY_EXCHANGED" }
    | { type: "FILTER_BY_ALL" }
    | { type: "SORT_BY_DATE" }
    | { type: "SORT_BY_CURRENCY_FROM" }
    | { type: "SORT_BY_AMOUNT_1" }
    | { type: "SORT_BY_CURRENCY_TO" }
    | { type: "SORT_BY_AMOUNT_2" }
    | { type: "SORT_BY_TYPE" }
    | { type: "CHANGE_PAGINATION"; payload: { value: number } };

  //Dispatching actions
  const transactionsReducer = (
    state: ReducerTransactionsI,
    action: TransactionAction
  ): ReducerTransactionsI => {
    const { initialList, filteredList, start, end } = state;
    switch (action.type) {
      case "CHANGE_PAGINATION":
        return {
          ...state,
          start: calcStartTransaction(action.payload.value),
          end: calcEndTransaction(action.payload.value),
          historyList: filteredList.slice(
            calcStartTransaction(action.payload.value),
            calcEndTransaction(action.payload.value)
          )
        };
      case "FETCH_HISTORY":
        return {
          ...state,
          filteredList: action.fetchedHistory,
          initialList: action.fetchedHistory,
          historyList: action.fetchedHistory.slice(start, end)
        };
      case "FILTER_BY_DATE":
        return {
          ...state,
          filteredList: filterTransactions({
            transactions: initialList,
            startDate: action.payload.startDate,
            endDate: action.payload.endDate,
            type: action.payload.type
          }),
          historyList: filterTransactions({
            transactions: initialList,
            startDate: action.payload.startDate,
            endDate: action.payload.endDate,
            type: action.payload.type
          }).slice(start, end)
        };
      case "FILTER_BY_LIVE":
        return {
          ...state,
          historyList: filteredList
            .filter((t) => {
              return t.status === "LIVE";
            })
            .slice(0, 5)
        };
      case "FILTER_BY_EXCHANGED":
        return {
          ...state,
          historyList: filteredList
            .filter((t) => {
              return t.status === "EXCHANGED";
            })
            .slice(0, 5)
        };
      case "FILTER_BY_ALL":
        return {
          ...state,
          historyList: filteredList.slice(0, 5)
        };
      case "SORT_BY_DATE":
        return {
          ...state,
          historyList: filteredList
            .sort((a, b) => {
              return dayjs(b.date).diff(dayjs(a.date));
            })
            .slice(start, end)
        };
      case "SORT_BY_CURRENCY_FROM":
        return {
          ...state,
          historyList: filteredList
            .sort((a, b) => {
              return a.from.localeCompare(b.from);
            })
            .slice(start, end)
        };
      case "SORT_BY_AMOUNT_1":
        return {
          ...state,
          historyList: filteredList
            .sort((a, b) => {
              return (
                Number(a.amount.replace(/\D/g, "")) -
                Number(b.amount.replace(/\D/g, ""))
              );
            })
            .slice(start, end)
        };
      case "SORT_BY_CURRENCY_TO":
        return {
          ...state,
          historyList: filteredList
            .sort((a, b) => {
              return a.to.localeCompare(b.to);
            })
            .slice(start, end)
        };
      case "SORT_BY_AMOUNT_2":
        return {
          ...state,
          historyList: filteredList
            .sort((a, b) => {
              return (
                Number(a.totalAmount?.replace(/\D/g, "")) -
                Number(b.totalAmount?.replace(/\D/g, ""))
              );
            })
            .slice(start, end)
        };
      case "SORT_BY_TYPE":
        return {
          ...state,
          historyList: filteredList
            .sort((a, b) => {
              return a.status.localeCompare(b.status);
            })
            .slice(start, end)
        };
      default:
        return state;
    }
  };

  const [{ historyList, filteredList, initialList, start, end }, dispatch] =
    useReducer(transactionsReducer, INITIAL_STATE);
  return { historyList, filteredList, initialList, start, end, dispatch };
};

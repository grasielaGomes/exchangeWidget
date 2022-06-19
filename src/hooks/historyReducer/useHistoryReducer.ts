import dayjs, { Dayjs } from "dayjs";
import { useReducer } from "react";
import { ExchangeTransactionI } from "../../components/table/interfaces";

export const useHistoryReducer = () => {
  interface ReducerTransactionsI {
    historyList: ExchangeTransactionI[];
    previousList: ExchangeTransactionI[];
  }

  // Reducer initial state
  const INITIAL_STATE: ReducerTransactionsI = {
    historyList: [],
    previousList: []
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
    | { type: "SORT_BY_TYPE" };

  //Dispatching actions
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
              dayjs(t.date) >= dayjs(action.payload.startDate) &&
              dayjs(t.date) <= dayjs(action.payload.endDate)
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
      case "SORT_BY_DATE":
        return {
          ...state,
          historyList: state.previousList.sort((a, b) => {
            return dayjs(b.date).diff(dayjs(a.date));
          })
        };
      case "SORT_BY_CURRENCY_FROM":
        return {
          ...state,
          historyList: state.previousList.sort((a, b) => {
            return a.from.localeCompare(b.from);
          })
        };
      case "SORT_BY_AMOUNT_1":
        return {
          ...state,
          historyList: state.previousList.sort((a, b) => {
            return (
              Number(a.amount.replace(/\D/g, "")) -
              Number(b.amount.replace(/\D/g, ""))
            );
          })
        };
      case "SORT_BY_CURRENCY_TO":
        return {
          ...state,
          historyList: state.previousList.sort((a, b) => {
            return a.to.localeCompare(b.to);
          })
        };
      case "SORT_BY_AMOUNT_2":
        return {
          ...state,
          historyList: state.previousList.sort((a, b) => {
            return (
              Number(a.totalAmount?.replace(/\D/g, "")) -
              Number(b.totalAmount?.replace(/\D/g, ""))
            );
          })
        };
      case "SORT_BY_TYPE":
        return {
          ...state,
          historyList: state.previousList.sort((a, b) => {
            return a.status.localeCompare(b.status);
          })
        };
      default:
        return state;
    }
  };

  const [{ historyList }, dispatch] = useReducer(
    transactionsReducer,
    INITIAL_STATE
  );
  return { historyList, dispatch };
};

import { useState } from "react";
import { useQuery } from "react-query";
import dayjs from "dayjs";

import { ExchangeTransactionI, TransactionRateI } from "../interfaces";
import { countries } from "../../forms/helpers";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

export const useHistoryTransactions = () => {
  const [startDate, setStartDate] = useState(dayjs().subtract(7, "day"));
  const [endDate, setEndDate] = useState(dayjs());
  const [historyList, setHistoryList] = useState<ExchangeTransactionI[]>([]);

  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const apiBaseUrl = import.meta.env.VITE_API_URL;
  const staleTime = import.meta.env.VITE_STALE_TIME;

  // Get transactions from API using react-query to cache the data
  const { isLoading, isFetching, error } = useQuery(
    "transactions",
    async () => {
      // Get currency rates
      const responseRates = await fetch(`${apiBaseUrl}/api/rates`);
      const dataRates = await responseRates.json();
      const rates: TransactionRateI[] = dataRates.rates;

      // Get transactions history
      const response = await fetch(`${apiBaseUrl}/api/transactions`);
      const data = await response.json();

      // Map transactions to exchange transactions
      const transactions: ExchangeTransactionI[] = data.transactions.map(
        (transaction: ExchangeTransactionI) => {
          const isExchanged = transaction.status === "EXCHANGED";

          // Get live currency rate
          const liveRate = rates.find((rate) => rate.target === transaction.to)
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

      setHistoryList(transactions);

      return data;
    },

    // Set how long wait until updating the data
    { staleTime: Number(staleTime) || 300000 }
  );

  const filterTransactionsByType = (type: string) => {
    setHistoryList(() => {
      return historyList.filter((transaction) => {
        return transaction.status === type;
      });
    });
  };

  return {
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
  };
};

import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "../../api";
import { countries } from "../../components/forms/helpers";
import { ExchangeTransactionI } from "../../components/table/interfaces";
import { useRates } from "../currencyRates/useRates";

export const useTransactions = () => {
  // Get currency rates from custom hook
  const { getRates } = useRates();

  // Get transactions from API using axios
  async function getTransactions(): Promise<ExchangeTransactionI[]> {
    const { data } = await api.get("/api/transactions");
    return data.transactions;
  }

  // Map transactions to a list of transactions with formatted data
  const mapHistoryTransactions = async () => {
    const transactions = await getTransactions();
    const rates = await getRates();
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
          currencyRate: isExchanged ? transaction.currencyRate : liveRate,
          date: transaction.date,
          from: transaction.from,
          id: transaction.id,
          to: isExchanged ? transaction.to : "USD",
          totalAmount: isExchanged ? totalFormatted : liveTotalFormatted,
          status: transaction.status
        };
      }
    );
    return transactionsMapped;
  };

  // Cache transactions
  const {
    data: mappedTransactions,
    isLoading,
    isFetching,
    error
  } = useQuery("transactions", mapHistoryTransactions, {
    // Refetch data every 1 minute in background
    refetchInterval: 1000 * 60,
    refetchIntervalInBackground: true
  });

  const queryClient = useQueryClient();

  // Use mutation to update transactions
  const createTransaction = useMutation(
    async (transaction: ExchangeTransactionI) => {
      const response = await api.post("/api/transactions", {
        transaction
      });
      return response.data.transactions;
    },
    // Invalidate cache when transaction is created
    { onSuccess: () => queryClient.invalidateQueries("transactions") }
  );

  return {
    mappedTransactions,
    isLoading,
    isFetching,
    error,
    createTransaction
  };
};

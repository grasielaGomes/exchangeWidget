import { useQuery } from "react-query";
import { api } from "../../api";
import { TransactionRateI } from "../../components/table/interfaces";

export const useRates = () => {

  // Get rates from API using axios
  async function getRates(): Promise<TransactionRateI[]> {
    const { data } = await api.get("rates");
    return data.rates;
  }

  // Get rates from API using react-query to cache the data
  const { data: rates } = useQuery("rates", getRates, {
    // Refetch data every 1 minute in background
    refetchInterval: 1000 * 60,
    refetchIntervalInBackground: true
  });

  return { getRates, rates };
};

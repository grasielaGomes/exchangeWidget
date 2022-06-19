import { useQuery } from "react-query";
import { api } from "../../api";
import { TransactionRateI } from "../../components/table/interfaces";

export const useRates = () => {
  // Get rates from API using axios
  async function getRates(): Promise<TransactionRateI[]> {
    const { data } = await api.get("/api/rates");
    return data.rates;
  }

  // Get rates from API using react-query to cache the data
  const { data: rates } = useQuery("rates", getRates);

  return { getRates, rates };
};

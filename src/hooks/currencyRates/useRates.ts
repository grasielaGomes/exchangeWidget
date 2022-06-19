import { api } from "../../api";
import { TransactionRateI } from "../../components/table/interfaces";

export const useRates = () => {
 
  async function getRates(): Promise<TransactionRateI[]> {
    const { data } = await api.get("/api/rates");
    return data.rates;
  }

  return { getRates };
};

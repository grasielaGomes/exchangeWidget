import { api } from "../../api";
import { ExchangeTransactionI } from "../../components/table/interfaces";

export const useTransactions = () => {
  async function getTransactions(): Promise<ExchangeTransactionI[]> {
    const { data } = await api.get("/api/transactions");
    return data.transactions;
  }

  return { getTransactions };
};

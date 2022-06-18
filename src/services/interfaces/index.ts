import { Dayjs } from "dayjs";

export interface TransactionI {
  amount: string;
  currencyRate?: number | string;
  date: Dayjs | string | Date;
  from: string;
  id: string | number;
  to: string;
  totalAmount?: string | number;
  status: string;
};

interface CurrencyI {
  timestamp: number;
  target: string;
  rates: {
    [key: string]: number;
  }
}

export interface CryptoRatesI {
  currencyRates: CurrencyI[];
}
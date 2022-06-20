import { Dayjs } from "dayjs";

export interface ExchangeTransactionI {
  amount: string;
  currencyRate?: number | string;
  date: Dayjs | string | Date;
  from: string;
  id: string | number;
  to: string;
  totalAmount?: string;
  status: string;
}

export interface TransactionRateI {
  timestamp: number;
  target: string;
  rates: {
    [key: string]: number;
  };
}

export interface TableRowI {
  index?: number;
  isFetching?: boolean;
  transaction: ExchangeTransactionI;
}

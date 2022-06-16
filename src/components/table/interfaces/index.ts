import { Dayjs } from "dayjs";

export interface ExchangeTransactionI {
  amount: string;
  currencyRate: number | string;
  date: Dayjs | string | Date;
  from: string;
  id: string | number;
  to: string;
  totalAmount: string;
  status: string;
}

export interface TableRowI {
  transaction: ExchangeTransactionI;
}
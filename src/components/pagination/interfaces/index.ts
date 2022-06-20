import { ExchangeTransactionI } from "../../table/interfaces";

export interface PaginationI {
  handlePage: (page: number) => void;
  list: ExchangeTransactionI[];
}

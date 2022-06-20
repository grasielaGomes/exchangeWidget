import dayjs, { Dayjs } from "dayjs";
import { ExchangeTransactionI } from "../components/table/interfaces";

// Format the amount diplay based on the currency code
export const formatCurrency = (
  value: string,
  country: string,
  currrency: string
) => {
  const valueClean = String(value).replace(/\D/g, "");
  const valueSplitted = Number(valueClean) / 100;
  if (value && country && currrency) {
    const formatter = valueSplitted.toLocaleString(country, {
      style: "currency",
      currency: currrency
    });
    return formatter;
  }
  return value;
};

// Filter transactions by date and type

interface FilterI {
  endDate: Date | Dayjs | string;
  startDate: Date | Dayjs | string;
  transactions: ExchangeTransactionI[];
  type: string;
}
export const filterTransactions = ({
  endDate,
  startDate,
  transactions,
  type
}: FilterI) => {
  const filterByDate = transactions.filter((t) => {
    return dayjs(t.date) >= dayjs(startDate) && dayjs(t.date) <= dayjs(endDate);
  });
  const filterByType = filterByDate.filter((t) => {
    if (type !== "ALL") {
      return t.status === type;
    }
    return;
  });

  const filteredList = filterByType.length !== 0 ? filterByType : filterByDate;
  return filteredList;
};

export const calcStartTransaction = (page: number) => {
  return page * 5 - 5;
};

export const calcEndTransaction = (page: number) => {
  return page * 5;
};

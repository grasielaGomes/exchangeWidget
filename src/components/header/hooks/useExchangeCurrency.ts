import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

import { useRates } from "../../../hooks/currencyRates/useRates";
import { useHistoryReducer } from "../../../hooks/historyReducer/useHistoryReducer";
import { initialOption } from "../../forms/helpers";
import { OptionI } from "../../forms/interfaces";
import { TransactionRateI } from "../../table/interfaces/index";

export const useExchangeCurrency = () => {
  const [currencyFrom, setCurrencyFrom] = useState<OptionI>(initialOption);
  const [currencyTo, setCurrencyTo] = useState<OptionI>(initialOption);
  const [amountFrom, setAmountFrom] = useState("");
  const [amountTo, setAmountTo] = useState("0");
  const [isValidated, setIsValidated] = useState(false);
  const { dispatch } = useHistoryReducer();

  const { rates: apiRates } = useRates();

  const getRate = (
    from: string,
    to: string,
    rates: TransactionRateI[] = []
  ) => {
    const rate = rates.find((rate) => rate.target === to);
    const currentRate = rate && rate.rates[from];
    return currentRate || 1;
  };

  // Handle exchange from initial amount
  const handleExchangeByAmountFrom = (
    value: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Set changed input value
    setAmountFrom(value.target.value);

    if (currencyFrom.value && currencyTo.value) {
      // Get the rate from the rates api
      const rate = getRate(currencyFrom.value, currencyTo.value, apiRates);

      // Calculate the amount to
      const newAmountTo = ((1 / rate) * Number(value.target.value))
        .toFixed(2)
        .toString();

      // Set the new value
      newAmountTo &&
        setAmountTo(() => {
          if (value.target.value) {
            return newAmountTo;
          }
          return "0";
        });
    }
  };

  // Handle exchange from total amount
  const handleExchangeByAmountTo = (
    value: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Set changed input value
    setAmountTo(value.target.value);

    if (currencyFrom.value && currencyTo.value) {
      // Get the rate from the rates api
      const rate = getRate(currencyFrom.value, currencyTo.value, apiRates);

      // Calculate the amount from
      const newAmountFrom =
        rate &&
        ((Number(value.target.value.replace(/\D/g, "")) * rate) / 100)
          .toFixed(2)
          .toString();

      // Set the new value
      newAmountFrom &&
        setAmountFrom(() => {
          if (value.target.value) {
            return newAmountFrom;
          }
          return "0";
        });
    }
  };

  const handleExchangeFromCurrencies = () => {
    if (amountFrom && amountTo) {
      const rate = getRate(currencyFrom.value, currencyTo.value, apiRates);
      const newAmountTo = ((1 / rate) * Number(amountFrom)).toFixed(2);
      setAmountTo(() => {
        if (amountFrom) {
          return newAmountTo;
        }
        return "0";
      });
    }
  };

  // Handle initial amount input change
  const handleAmountFromChange = (
    value: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleExchangeByAmountFrom(value);
    setIsValidated(false);
  };

  // Handle total amount input change
  const handleAmountToChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    handleExchangeByAmountTo(value);
    setIsValidated(false);
  };

  // Handle crypto change
  const handleCurrencyFromChange = (option: OptionI) => {
    setCurrencyFrom(option);
    setIsValidated(false);
  };

  // Handle currency change
  const handleCurrencyToChange = (option: OptionI) => {
    setCurrencyTo(option);
    setIsValidated(false);
  };

  // Handle transaction submit
  const handleSaveTransaction = () => {
    setIsValidated(true);
    dispatch({
      type: "ADD_TRANSACTION",
      payload: {
        amount: amountTo,
        currencyRate: "",
        date: dayjs(),
        from: currencyFrom.value,
        id: faker.finance.bitcoinAddress(),
        to: currencyTo.value,
        totalAmount: amountFrom,
        status: "LIVE"
      }
    });
  };

  // Update the amount to when the currency to changes
  useEffect(() => {
    handleExchangeFromCurrencies();
  }, [currencyFrom, currencyTo]);

  return {
    amountFrom,
    amountTo,
    currencyFrom,
    currencyTo,
    handleAmountFromChange,
    handleAmountToChange,
    handleCurrencyFromChange,
    handleCurrencyToChange,
    handleSaveTransaction,
    isValidated
  };
};

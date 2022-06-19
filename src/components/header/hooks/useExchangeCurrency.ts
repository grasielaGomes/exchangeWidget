import { useState, useEffect } from 'react';
import { useRates } from "../../../hooks/currencyRates/useRates";
import { initialOption } from "../../forms/helpers";
import { OptionI } from "../../forms/interfaces";

export const useExchangeCurrency = () => {
  const [currencyFrom, setCurrencyFrom] = useState<OptionI>(initialOption);
  const [currencyTo, setCurrencyTo] = useState<OptionI>(initialOption);
  const [amountFrom, setAmountFrom] = useState("");
  const [amountTo, setAmountTo] = useState("0");
  const [isValidated, setIsValidated] = useState(false);

  const { rates } = useRates();

  const handleExchangeCalculation = () => {
    if (currencyFrom.value && currencyTo.value && amountFrom) {
      const currencyRates = rates?.find(
        (rate) => rate.target === currencyTo.value
      )?.rates;
      const rate = currencyRates && currencyRates[currencyFrom.value];
      const newAmountTo =
        rate && (Number(amountFrom) / rate).toFixed(2).toString();
      setAmountTo(newAmountTo || "");
    }
  };

  // Handle amount from change
  const handleAmountFromChange = (
    value: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAmountFrom(value.target.value);
    setIsValidated(false);
  };

  // Handle amount to change
  const handleAmountToChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    setAmountTo(value.target.value);
    setIsValidated(false);
  };

  // Handle currency from change
  const handleCurrencyFromChange = (option: OptionI) => {
    setCurrencyFrom(option);
    setIsValidated(false);
  };

  // Handle currency to change
  const handleCurrencyToChange = (option: OptionI) => {
    setCurrencyTo(option);
    setIsValidated(false);
  };

  // Handle transaction submit
  const handleSaveTransaction = () => {
    setIsValidated(true);
  };

  useEffect(() => {
    handleExchangeCalculation();
  }, [currencyFrom, currencyTo, amountFrom, rates]);

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

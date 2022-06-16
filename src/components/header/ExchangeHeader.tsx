import { FullButton } from "../buttons";
import { DropdowMenu } from "../forms";
import {
  cryptoOptions,
  currenciesOptions,
  initialOption,
  countries
} from "../forms/helpers";
import { AmountInput } from "../forms/AmountInput";
import { Heading } from "../typography";
import { useState } from "react";
import { CustomText } from "../typography/CustomText";
import { OptionI } from "../forms/interfaces/index";

export const ExchangeHeader = () => {
  const [currencyFrom, setCurrencyFrom] = useState<OptionI>(initialOption);
  const [currencyTo, setCurrencyTo] = useState<OptionI>(initialOption);
  const [amountFrom, setAmountFrom] = useState("");
  const [amountTo, setAmountTo] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  return (
    <header className="bg-white shadow-3xl px-6 py-12 w-full">
      <div className="md:max-w-fit md:mx-auto">
        <div className="mb-6">
          <Heading variant="h1">Exchange</Heading>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <DropdowMenu
            options={cryptoOptions}
            label="Currency from"
            handleSelect={(value) => setCurrencyFrom(value)}
          />
          <AmountInput
            handleSubmitAmount={(amount) => setAmountFrom(amount)}
            hasError={!amountFrom && isValidated}
            initialValue=""
          />
          <div className="hidden mb-2 md:block">
            <CustomText>=</CustomText>
          </div>
          <DropdowMenu
            options={currenciesOptions}
            label="Currency to"
            handleSelect={(value) => setCurrencyTo(value)}
          />
          <AmountInput
            currency={{
              country: countries[currencyTo.value as keyof typeof countries],
              type: currencyTo.value.toLowerCase()
            }}
            handleSubmitAmount={(amount) => setAmountTo(amount)}
            hasError={!amountFrom && !amountTo && isValidated}
            initialValue="0"
          />
          <FullButton
            handleClick={() => {
              setIsValidated(true);
            }}
            type="submit"
          >
            <>
              <span className="md:hidden">Exchange</span>
              <span className="hidden md:inline">Save</span>
            </>
          </FullButton>
        </div>
      </div>
    </header>
  );
};

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

const styles = {
  container: "shadow-3xl px-6 py-12 w-full",
  content: "md:w-[1095px] md:mx-auto",
  header: "mb-6",
  bodyContainer: "flex flex-col gap-4 md:flex-row md:items-end",
  hiddenEqual: "hidden mb-2 md:block",
  buttonLabelMobile: "md:hidden",
  buttonLabelDesktop: "hidden md:inline"
};

const texts = {
  header: "Exchange",
  from: "Currency from",
  to: "Currency to",
  buttonMobile: "Exchange",
  buttonDesktop: "Save"
};

export const ExchangeHeader = () => {
  const [currencyFrom, setCurrencyFrom] = useState<OptionI>(initialOption);
  const [currencyTo, setCurrencyTo] = useState<OptionI>(initialOption);
  const [amountFrom, setAmountFrom] = useState("");
  const [amountTo, setAmountTo] = useState("");
  const [isValidated, setIsValidated] = useState(false);


  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Heading variant="h1">{texts.header}</Heading>
        </div>
        <div className={styles.bodyContainer}>
          <DropdowMenu
            options={cryptoOptions}
            label={texts.from}
            handleSelect={(value) => setCurrencyFrom(value)}
          />
          <AmountInput
            handleSubmitAmount={(amount) => setAmountFrom(amount)}
            hasError={!amountFrom && isValidated}
            initialValue=""
          />
          <div className={styles.hiddenEqual}>
            <CustomText>=</CustomText>
          </div>
          <DropdowMenu
            options={currenciesOptions}
            label={texts.to}
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
              <span className={styles.buttonLabelMobile}>{texts.buttonMobile}</span>
              <span className={styles.buttonLabelDesktop}>{texts.buttonDesktop}</span>
            </>
          </FullButton>
        </div>
      </div>
    </header>
  );
};
